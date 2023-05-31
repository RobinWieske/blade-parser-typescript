import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils';
import { StringUtilities } from '../../../utilities/stringUtilities';

suite('Pint Transformer Accpetance: support_resources_views_components_modal_subheading_blade_php', () => {
    test('pint: it can format support_resources_views_components_modal_subheading_blade_php', () => {
        const input = `<p {{ $attributes->class(['filament-modal-subheading text-gray-500']) }}>
    {{ $slot }}
</p>
`;
        const output = `<p {{ $attributes->class(['filament-modal-subheading text-gray-500']) }}>
    {{ $slot }}
</p>
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(input).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings(formatBladeStringWithPint(output).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});