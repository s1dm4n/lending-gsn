const { DateTime } = require("luxon");
const slugify = require("@sindresorhus/slugify").default;

module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("justYear", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy');
  });

  // Копирование статики
  eleventyConfig.addPassthroughCopy({
    "src/css/style.css": "css/style.css",
    "src/css/swiper-bundle.min.css": "css/swiper-bundle.min.css",
    "src/fonts": "fonts",
    "src/img": "img",
    "src/sert": "sert",
    "src/js": "js",
    "src/modules": "modules",
    "src/vid": "vid"
  });

  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
      layout: "_layouts"
    },
    templateFormats: ["njk", "md", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};