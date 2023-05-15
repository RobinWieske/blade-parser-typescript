import assert from 'assert';
import { formatBladeString } from '../formatting/prettier/utils';

suite('Echo Formatting', () => {
    test('it formats valid PHP code', () => {
        assert.strictEqual(
            formatBladeString('{{$test   +$that}}').trim(),
            '{{ $test + $that }}'
        );
    });

    test('it formats valid PHP code in {!!', () => {
        assert.strictEqual(
            formatBladeString('{!!$test   +$that!!}').trim(),
            '{!! $test + $that !!}'
        );
    });

    test('it formats valid PHP code in {{{', () => {
        assert.strictEqual(
            formatBladeString('{{{$test   +$that}}}').trim(),
            '{{{ $test + $that }}}'
        );
    });

    test('it ingores invalid PHP code', () => {
        assert.strictEqual(
            formatBladeString('{{$test   $+++$that}}').trim(),
            '{{ $test   $+++$that }}'
        );
    });

    test('it ignores invalid PHP code in {!!', () => {
        assert.strictEqual(
            formatBladeString('{!!$test   $+++$that!!}').trim(),
            '{!! $test   $+++$that !!}'
        );
    });

    test('it ignores invalid PHP code in {{{', () => {
        assert.strictEqual(
            formatBladeString('{{{$test   $+++$that}}}').trim(),
            '{{{ $test   $+++$that }}}'
        );
    });

    test('test formatting inline echo arrays does not add extra whitespace', () => {
        const input = `<a
href="#"
target="_blank"
{{ $attributes->merge(["class" => "rounded transition focus-visible:outline-none focus-visible:ring focus-visible:ring-red-600"]) }}
>
Some link
</a>`;
        const expected = `<a
    href="#"
    target="_blank"
    {{ $attributes->merge(["class" => "rounded transition focus-visible:outline-none focus-visible:ring focus-visible:ring-red-600"]) }}
>
    Some link
</a>`;
        assert.strictEqual(formatBladeString(input).trim(), expected);
    });

    test('it can format inline echos as text', () => {
        assert.strictEqual(
            formatBladeString(`
            <p>test {{ $title }} test
            
            asdfasdf </p>

            <p>
        {{ $test }}
        </p>`).trim(),
            `<p>test {{ $title }} test asdfasdf</p>

<p>
    {{ $test }}
</p>`
        );
    });

    test('it does not force wrap long echos', () => {
        const input = `{{ $attributes->class(["text-gray-900 border-gray-300 invalid:text-gray-400 block w-full h-9 py-1 transition duration-75 rounded-lg shadow-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-inset focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:border-primary-500"]) }}`;
        const out = `{{ $attributes->class(["text-gray-900 border-gray-300 invalid:text-gray-400 block w-full h-9 py-1 transition duration-75 rounded-lg shadow-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-inset focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:border-primary-500"]) }}`;
        assert.strictEqual(formatBladeString(input).trim(), out);
    });
});