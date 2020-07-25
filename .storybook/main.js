module.exports = {
  stories: ['../src/__stories__/**/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    '@storybook/addon-docs'
  ],
};
