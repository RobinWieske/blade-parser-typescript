import assert from 'assert';
import { formatBladeStringWithPint } from '../../../formatting/prettier/utils.js';
import { StringUtilities } from '../../../utilities/stringUtilities.js';
import { setupTestHooks } from '../../../test/testUtils/formatting.js';

suite('Pint Transformer Acceptance: panels_resources_views_pages_auth_password_reset_request_password_reset_blade_php', () => {
    setupTestHooks();
    test('pint: it can format panels_resources_views_pages_auth_password_reset_request_password_reset_blade_php', async () => {
        const input = `<div>
    @if (filament()->hasLogin())
        <x-slot name="subheading">
            {{ $this->loginAction }}
        </x-slot>
    @endif

    <form
        wire:submit.prevent="request"
        class="grid gap-y-8"
    >
        {{ $this->form }}

        {{ $this->requestAction }}
    </form>
</div>
`;
        const output = `<div>
    @if (filament()->hasLogin())
        <x-slot name="subheading">
            {{ $this->loginAction }}
        </x-slot>
    @endif

    <form wire:submit.prevent="request" class="grid gap-y-8">
        {{ $this->form }}

        {{ $this->requestAction }}
    </form>
</div>
`;

        assert.strictEqual(StringUtilities.normalizeLineEndings((await formatBladeStringWithPint(input)).trim()), StringUtilities.normalizeLineEndings(output.trim()));
        assert.strictEqual(StringUtilities.normalizeLineEndings((await formatBladeStringWithPint(output)).trim()), StringUtilities.normalizeLineEndings(output.trim()));
    }).timeout(30000);
});