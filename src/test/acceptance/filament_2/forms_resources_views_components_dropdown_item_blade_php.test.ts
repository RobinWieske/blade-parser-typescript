import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils';
import { StringUtilities } from '../../../utilities/stringUtilities';

suite('Pint Transformer Accpetance: forms_resources_views_components_dropdown_item_blade_php', () => {
    test('pint: it can format forms_resources_views_components_dropdown_item_blade_php', () => {
        const input = `@captureSlots([
    'detail',
])

<x-forms::dropdown.list.item :attributes="\\Filament\\Support\\prepare_inherited_attributes($attributes)->merge($slots)">
    {{ $slot }}
</x-forms::dropdown.list.item>
`;
        const output = `@captureSlots([
    'detail',
])

<x-forms::dropdown.list.item
    :attributes="\\Filament\\Support\\prepare_inherited_attributes($attributes)->merge($slots)"
>
    {{ $slot }}
</x-forms::dropdown.list.item>
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(input).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(output).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});