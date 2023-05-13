import assert from 'assert';
import { transformString } from './testUtils/transform';
import { formatBladeString } from '../formatting/prettier/utils';

suite('General Template Formatting', () => {
    test('it can format strangely indented files', () => {
        const template = `<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@yield('title', 'Default Title')</title>
        
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
                    <body>
                        <header>
                            @include('partials.nav')
                        </header>

                        <main> @yield('content')
</main>

                        <footer>
                            @include('partials.footer')
                    </footer>

                    <!-- Scripts -->
<script src="{{ asset('js/app.js') }}"></script>
                    </body>
                </html>
`; 
        const out = `<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>@yield('title', 'Default Title')</title>

        <!-- Styles -->
        <link href="{{ asset("css/app.css") }}" rel="stylesheet" />
    </head>
    <body>
        <header>
            @include("partials.nav")
        </header>

        <main>@yield("content")</main>

        <footer>
            @include("partials.footer")
        </footer>

        <!-- Scripts -->
        <script src="{{ asset("js/app.js") }}"></script>
    </body>
</html>
`
        assert.strictEqual(formatBladeString(template), out);
    });
});