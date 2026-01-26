const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/animations.json', 'utf8'));
const animations = data.animations;

// Group by category
const byCategory = {};
animations.forEach(anim => {
    if (!byCategory[anim.category]) {
        byCategory[anim.category] = [];
    }
    byCategory[anim.category].push({
        id: anim.id,
        name: anim.name,
        tags: anim.tags,
        hasFramerMotion: !!anim.code.framerMotion,
        hasCSS: !!anim.code.css,
        description: anim.description
    });
});

// Detect potential duplicates
const report = {
    summary: {
        total: animations.length,
        byCategory: Object.keys(byCategory).reduce((acc, cat) => {
            acc[cat] = byCategory[cat].length;
            return acc;
        }, {})
    },
    categories: {}
};

// Analyze each category
Object.keys(byCategory).forEach(cat => {
    const anims = byCategory[cat];
    const duplicates = [];

    // Check for similar names or tags
    for (let i = 0; i < anims.length; i++) {
        for (let j = i + 1; j < anims.length; j++) {
            const a1 = anims[i];
            const a2 = anims[j];

            // Check tag overlap
            const commonTags = a1.tags.filter(t => a2.tags.includes(t));
            const tagOverlap = commonTags.length / Math.min(a1.tags.length, a2.tags.length);

            // Check name similarity
            const nameSimilar = a1.name.toLowerCase().includes(a2.name.toLowerCase()) ||
                a2.name.toLowerCase().includes(a1.name.toLowerCase());

            if (tagOverlap > 0.5 || nameSimilar) {
                duplicates.push({
                    pair: [a1.name, a2.name],
                    reason: nameSimilar ? 'Similar names' : `${commonTags.length} common tags: ${commonTags.join(', ')}`,
                    implementations: {
                        [a1.name]: { fm: a1.hasFramerMotion, css: a1.hasCSS },
                        [a2.name]: { fm: a2.hasFramerMotion, css: a2.hasCSS }
                    }
                });
            }
        }
    }

    report.categories[cat] = {
        count: anims.length,
        animations: anims.map(a => ({
            name: a.name,
            implementation: a.hasFramerMotion && a.hasCSS ? 'Both' : a.hasFramerMotion ? 'FM' : 'CSS',
            tags: a.tags.slice(0, 4).join(', ')
        })),
        potentialDuplicates: duplicates.length > 0 ? duplicates : 'None'
    };
});

console.log(JSON.stringify(report, null, 2));
