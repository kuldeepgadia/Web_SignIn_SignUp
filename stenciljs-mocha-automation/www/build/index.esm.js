import './index-182ac87e.js';
import { A as ActiveRouter } from './active-router-fea3dfc5.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
