const names = [
    "Earth",
    "Crater",
    "Virgo",
    "Bootes",
    "Centaurus",
    "Libra",
    "Serpens Caput",
    "Norma",
    "Scorpio",
    "Cra",
    "Scutum",
    "Sagitarius",
    "Aquila",
    "Mic",
    "Capricorn",
    "Pisces Austrinus",
    "Equuleus",
    "Pegasus",
    "Sculptor",
    "Pisces",
    "Andromeda",
    "Triangulum",
    "Aries",
    "Perseus",
    "Cetus",
    "Taurus",
    "Auriga",
    "Eridanus",
    "Orion",
    "Canis Minor",
    "Monoceros",
    "Gemini",
    "Hydra",
    "Lynx",
    "Cancer",
    "Sextans",
    "Leo Minor",
    "Leo",
];

export const glyphs = () => {
    let table = [];
    for (let i = 0; i < names.length; i++) {
        table.push({id: (i + 1), src: "./vfx/glyphs/glyph" + (i + 1) + ".png", description: names[i]});
    }
    return table;
};

export default glyphs;
