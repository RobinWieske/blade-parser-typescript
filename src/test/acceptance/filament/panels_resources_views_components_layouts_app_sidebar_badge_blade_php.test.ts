import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils';
import { StringUtilities } from '../../../utilities/stringUtilities';

suite('Pint Transformer Accpetance: panels_resources_views_components_layouts_app_sidebar_badge_blade_php', () => {
    test('pint: it can format panels_resources_views_components_layouts_app_sidebar_badge_blade_php', () => {
        const input = `@props([
    'active' => false,
    'badge' => null,
    'badgeColor' => null,
])

<span
    @if (filament()->isSidebarCollapsibleOnDesktop())
        x-show="$store.sidebar.isOpen"
    @endif
    @class([
        'inline-flex items-center justify-center ms-auto min-h-4 px-2 py-0.5 text-xs font-medium tracking-tight rounded-xl whitespace-normal',
        match ($active) {
            true => 'text-white bg-gray-900/10',
            false => match ($badgeColor) {
                'danger' => 'text-danger-700 bg-danger-500/10 dark:text-danger-500',
                'gray' => 'text-gray-700 bg-gray-500/10 dark:text-gray-500',
                'info' => 'text-info-700 bg-info-500/10 dark:text-info-500',
                'primary', null => 'text-primary-700 bg-primary-500/10 dark:text-primary-500',
                'secondary' => 'text-secondary-700 bg-secondary-500/10 dark:text-secondary-500',
                'success' => 'text-success-700 bg-success-500/10 dark:text-success-500',
                'warning' => 'text-warning-700 bg-warning-500/10 dark:text-warning-500',
                default => $badgeColor,
            },
        },
    ])
>
    {{ $badge }}
</span>
`;
        const output = `@props([
    'active' => false,
    'badge' => null,
    'badgeColor' => null,
])

<span
    @if (filament()->isSidebarCollapsibleOnDesktop())
        x-show="$store.sidebar.isOpen"
    @endif
    @class([
        'inline-flex items-center justify-center ms-auto min-h-4 px-2 py-0.5 text-xs font-medium tracking-tight rounded-xl whitespace-normal',
        match ($active) {
            true => 'text-white bg-gray-900/10',
            false => match ($badgeColor) {
                'danger' => 'text-danger-700 bg-danger-500/10 dark:text-danger-500',
                'gray' => 'text-gray-700 bg-gray-500/10 dark:text-gray-500',
                'info' => 'text-info-700 bg-info-500/10 dark:text-info-500',
                'primary', null => 'text-primary-700 bg-primary-500/10 dark:text-primary-500',
                'secondary' => 'text-secondary-700 bg-secondary-500/10 dark:text-secondary-500',
                'success' => 'text-success-700 bg-success-500/10 dark:text-success-500',
                'warning' => 'text-warning-700 bg-warning-500/10 dark:text-warning-500',
                default => $badgeColor,
            },
        },
    ])
>
    {{ $badge }}
</span>
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(input).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(output).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});