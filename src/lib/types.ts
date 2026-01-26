export interface AnimationConfig {
  label: string;
  default: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  type?: 'color' | 'boolean';
  options?: string[];
}

export interface Animation {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  preview: {
    trigger: 'hover' | 'click' | 'focus' | 'drag' | 'auto';
    duration: number;
  };
  config: Record<string, AnimationConfig>;
  prompts: {
    beginner: string;
    pro: string;
  };
  code: {
    framerMotion?: string;
    css?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  group?: 'components' | 'design' | 'videos';
}

export interface AnimationsData {
  categories: Category[];
  animations: Animation[];
}

// Helper type for config values
export type ConfigValues = Record<string, number | string | boolean>;
