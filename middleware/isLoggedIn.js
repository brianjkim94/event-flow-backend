function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        req.flash('error', 'You need to be signed in to view page. Please login...');
        return res.redirect('/auth/login');
    }
    next();
}

module.exports = isLoggedIn;
