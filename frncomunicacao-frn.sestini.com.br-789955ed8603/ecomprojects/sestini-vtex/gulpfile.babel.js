import Taskerify from 'taskerify';

Taskerify.config.sourcemaps = false;
Taskerify.config.srcPath = './src/assets'; // Src Path
Taskerify.config.distPath = './dist/assets'; // Dist Path
Taskerify.config.srcViewsPath = './src'; // Views Src Path
Taskerify.config.distViewsPath = './dist'; // Compiled Views Dist Path (HTML)

const NODE_MODULES = './node_modules';

const storeName = 'sestini';
const commomFiles = ['globals'];
const desktopFiles = [
    'general',
    'home',
    'institutional',
    'quem-somos',
    'regulamentos-e-promocoes',
    'trabalhe-conosco',
    'fale-conosco',
    'seja-franqueado',
    'assistencia-tecnica',
    'instrucao-de-cadeado',
    'representantes',
    'vendas-corporativas',
    'imprensa',
    'product',
    'category',
    'register',
    'search',
    'empty-search',
    'account',
    'store-locator',
    'contact',
    'voltaaulas',
    'licenca-anymalu',
    'licenca-capricho',
    'licenca-tini',
    'licenca-paulfrank',
    'licenca-tokidoki',
    'licenca-authentic',
    'licenca-magic',
    'outlet',
    'bemvindo-form',
    'garantia',
];

const mobileFiles = [
    'general',
    'home',
    'institutional',
    'quem-somos',
    'regulamentos-e-promocoes',
    'fale-conosco',
    'trabalhe-conosco',
    'seja-franqueado',
    'assistencia-tecnica',
    'instrucao-de-cadeado',
    'representantes',
    'vendas-corporativas',
    'imprensa',
    'product',
    'category',
    'register',
    'search',
    'empty-search',
    'account',
    'store-locator',
    'contact',
    'voltaaulas',
    'licenca-anymalu',
    'licenca-capricho',
    'licenca-tini',
    'licenca-paulfrank',
    'licenca-tokidoki',
    'licenca-authentic',
    'licenca-magic',
    'outlet',
    'bemvindo-form',
    'garantia',
];

/* eslint-disable */
Taskerify(mix => {
    const SRC = Taskerify.config.srcPath;

    const ARCHIVES = "./dist/arquivos";
    const FILES = "./dist/files";

    /* eslint-enable */
    // PugJS Template
    mix.pug();

    // Javascript Linter
    mix.eslint();

    // Image Minifier
    mix.imagemin(`${SRC}/common/images`, ARCHIVES);

    // Common Files
    commomFiles.map((file) => {
        mix.browserify(`${SRC}/common/js/${storeName}-common-${file}.js`, ARCHIVES);
        mix.sass(`${SRC}/common/scss/${storeName}-common-${file}.scss`, ARCHIVES);
        return true;
    });

    // Main Desktop Files
    desktopFiles.map((file) => {
        mix.browserify(
            `${SRC}/desktop/js/${storeName}-desktop-${file}.js`,
            ARCHIVES,
        );
        mix.sass(`${SRC}/desktop/scss/${storeName}-desktop-${file}.scss`, ARCHIVES);
        return true;
    });

    // Main Mobile Files
    mobileFiles.map((file) => {
        mix.browserify(`${SRC}/mobile/js/${storeName}-mobile-${file}.js`, ARCHIVES);
        mix.sass(`${SRC}/mobile/scss/${storeName}-mobile-${file}.scss`, ARCHIVES);
        return true;
    });

    // Checkout and OrderPlaced
    mix.sass(`${SRC}/common/scss/checkout6-custom.scss`, FILES);
    mix.browserify(`${SRC}/common/js/checkout6-custom.js`, FILES);

    mix.sass(`${SRC}/common/scss/checkout-confirmation4-custom.scss`, FILES);
    mix.browserify(`${SRC}/common/js/checkout-confirmation4-custom.js`, FILES);

    // Mix Vendor Scripts
    mix.scripts(
        [`${NODE_MODULES}/vtex-minicart/dist/vtex-minicart.js`],
        `${ARCHIVES}/${storeName}-common-vendor.js`,
    );

    mix.vtex(storeName);
});
