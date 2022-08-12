const getBackground = (background) => {
    const backgrounds = [
        'circle-scatter-haikei.svg',
        'layered-waves-haikei (1).svg',
        'layered-waves-haikei.svg',
        'stacked-peaks-haikei.svg',
        'stacked-steps-haikei.svg',
        'wave (2).svg',
        'blob-scene-haikei.svg',
        'blob-scene-haikei (1).svg',
        'wave-haikei.svg',
        'wave-haikei (1).svg',
        'layered-waves-haikei (3).svg'
    ]
    return '/backgrounds/' + (backgrounds[background || getRandomInt(0, backgrounds.length - 1)] || backgrounds[0])
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export default getBackground