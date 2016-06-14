'use strict';
if(typeof window === 'undefined'){
    module.exports = require('./lib/mean-seo');
}else{
    module.exports = function(){
        return null;
    };
}
