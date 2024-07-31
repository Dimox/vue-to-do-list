import globals from 'globals'
import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import vueEslintParser from 'vue-eslint-parser'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tsEslint.config(
  ...eslintPluginVue.configs['flat/recommended'],
  eslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['src/**/*.{ts,js,vue}'],
    extends: [...tsEslint.configs.strictTypeChecked, ...tsEslint.configs.stylisticTypeChecked],
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      vue: eslintPluginVue,
    },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        parser: tsEslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
        },
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  }
)
