import _ from 'lodash';

// -> Imports JSON
const test = require("./categories/test.json");

class Translate {

   constructor(lang) {

      const dict = [];
      const translates = dict.concat(
				test
				);

      this.params = {
         lang,
         translates
      }

   }

   localize(lang) {
      this.params.lang = lang;
   }

   get(source) {


      const translate = _.find(this.params.translates, { 'match': source});
      return (translate && translate[this.params.lang])?translate[this.params.lang]:source;

   }

   t(source) {
      return this.get(source);
   }

}

export default Translate;
