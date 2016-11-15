import { createStructuredSelector as core } from 'reselect';

const log = (selectors) => {
    var keys = Object.keys(selectors);
    var loggedSelectors = {};
    keys.forEach((key) => loggedSelectors[key] = function () {
        var result = selectors[key].apply(undefined, arguments);
        console.log('Selecting ' + key, result);
        return result;
    });
    return loggedSelectors;
}

export const createStructuredSelector = (selectors) => {
    // Apply desired enhancers
    var enhancedSelectors = selectors;
    if (true) {
        enhancedSelectors = log(enhancedSelectors);
    }
    return core(enhancedSelectors);

}