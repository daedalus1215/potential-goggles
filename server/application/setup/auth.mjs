import oauth2orize from 'oauth2orize';
import bearer from 'passport-http-bearer';
import login from 'connect-ensure-login';


const auth = (app, passport) => {

    const server = oauth2orize.createServer();
    const bearerStrategy = bearer.Strategy;

    // Define OAuth2 endpoints
    server.serializeClient((client, done) => {
        return done(null, client.id);
    });

    server.grant(oauth2orize.grant.code(function (client, redirectURI, user, ares, done) {
        var code = utils.uid(16);

        var ac = new AuthorizationCode(code, client.id, redirectURI, user.id, ares.scope);
        ac.save(function (err) {
            if (err) { return done(err); }
            return done(null, code);
        });
    }));

    server.exchange(oauth2orize.exchange.code(function (client, code, redirectURI, done) {
        AuthorizationCode.findOne(code, function (err, code) {
            if (err) { return done(err); }
            if (client.id !== code.clientId) { return done(null, false); }
            if (redirectURI !== code.redirectUri) { return done(null, false); }

            var token = utils.uid(256);
            var at = new AccessToken(token, code.userId, code.clientId, code.scope);
            at.save(function (err) {
                if (err) { return done(err); }
                return done(null, token);
            });
        });
    }));


    app.use(passport.initialize());

    passport.use(new bearerStrategy(
        (token, done) => {
            // Validate the token and retrieve associated user
        }
    ));

    app.post('/dialog/authorize/decision',
        login.ensureLoggedIn(),
        server.decision());

    server.serializeClient(function (client, done) {
        return done(null, client.id);
    });

    server.deserializeClient(function (id, done) {
        Clients.findOne(id, function (err, client) {
            if (err) { return done(err); }
            return done(null, client);
        });
    });

    app.post('/token',
        passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
        server.token(),
        server.errorHandler());

    app.get('/api/userinfo',
        passport.authenticate('bearer', { session: false }),
        function (req, res) {
            res.json(req.user);
        });
};

export default auth;