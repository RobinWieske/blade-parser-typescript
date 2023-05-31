import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils';
import { StringUtilities } from '../../../utilities/stringUtilities';

suite('Pint Transformer Accpetance: panels_resources_views_components_global_search_actions_blade_php', () => {
    test('pint: it can format panels_resources_views_components_global_search_actions_blade_php', () => {
        const input = `@props([
    'actions',
])

<div {{ $attributes->class('filament-global-search-actions mt-4 flex gap-3') }}>
    @foreach ($actions as $action)
        @if ($action->isVisible())
            {{ $action }}
        @endif
    @endforeach
</div>
`;
        const output = `@props([
    'actions',
])

<div
    {{ $attributes->class('filament-global-search-actions mt-4 flex gap-3') }}
>
    @foreach ($actions as $action)
        @if ($action->isVisible())
            {{ $action }}
        @endif
    @endforeach
</div>
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(input).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(output).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});