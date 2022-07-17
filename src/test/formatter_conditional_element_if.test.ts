import assert from 'assert';
import { formatBladeString } from '../formatting/prettier/utils';

suite('Conditional Element If Statements', () => {
    test('it can detect and format conditional if statements as HTML tags', () => {
        assert.strictEqual(
            formatBladeString(`                        <@if($something)here @endif class="something">
    <div><p>SOme {{ $text }} text</p>
                            <@if($something)here @endif class="something">
    <div><p>SOme {{ $text }} text</p>
</div>
        </@if($something)here @endif>
</div>
        </@if($something)here @endif>`).trim(),
            `<@if($something)here @endif class="something">
    <div>
        <p>SOme {{ $text }} text</p>
        <@if($something)here @endif class="something">
            <div><p>SOme {{ $text }} text</p></div>
        </@if($something)here @endif>
    </div>
</@if($something)here @endif>`
        );
    });

    test('it does not format exact matches as dynamic HTML', () => {
        assert.strictEqual(
            formatBladeString(`                       <@if($something)here @endif class="something">
            <div><p>SOme {{ $text }} text</p>
                                    <@if($something)here @endif class="something">
            <div><p>SOme {{ $text }} text</p>
        
            @if($something)here @endif
        </div>
                </@if($something)here @endif>
        </div>
                </@if($something)here @endif>`).trim(),
            `<@if($something)here @endif class="something">
    <div>
        <p>SOme {{ $text }} text</p>
        <@if($something)here @endif class="something">
            <div>
                <p>SOme {{ $text }} text</p>

                @if($something)
                    here
                @endif
            </div>
        </@if($something)here @endif>
    </div>
</@if($something)here @endif>`
        );
    });
});