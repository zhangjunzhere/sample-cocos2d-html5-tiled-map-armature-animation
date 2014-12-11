var Player = ccs.Armature.extend({

    id: null,
    body: null,
    body2: null,
    tag: null,
    distance: null,
    onGround: null,
    rolling: null,
    times: [],
    isRemote: null,

    ctor: function (posX, posY, isRemote) {

        this._super();
        // Initialize with RunnerFinal armature
        this.init('RunnerFinal');
        this.tag = 'Player';
        this.distance = 0;
        this.onGround = true;
        this.rolling = false;
        this.setScale(0.6);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setPosition(cc.p(posX, posY));
        this.isRemote = isRemote;
        if (!isRemote) {
            var shape = new b2PolygonShape();
            shape.SetAsBox(20 / PTM_RATIO, 35 / PTM_RATIO);
            this.body = createBody(cc.p(posX, posY), shape, this, 'dynamic', {
                density: 1.0,
                friction: 0.5,
                restitution: 0.0
            }, PLAYER_GROUP, null);
            this.body.SetFixedRotation(true);
            this.body.SetSleepingAllowed(false);
        }
    },

    land: function () {
        this.onGround = true;
        // Play armature animation 'land'
        this.getAnimation().play('land');
        if (socket)
            socket.emit('change animation', {
                animation: 'land'
            });
    },

    roll: function () {
        if (this.onGround && !this.rolling) {
            if (this.body.GetLinearVelocity().y > -0.5 && this.body.GetLinearVelocity().y < 0.5) {
                this.rolling = true;
                // Play armature animation 'roll'
                this.getAnimation().play('roll');
                this.body.SetActive(false);
            }
        }
    },

    jump: function () {
        if (this.onGround && !this.rolling) {
            cc.AudioEngine.getInstance().playEffect('asset/audios/jump.wav');
            // Play armature animation 'jump'
            this.getAnimation().play('jump');
            this.body.ApplyImpulse(new b2Vec2(0, this.body.GetMass() * 10), this.body.GetWorldCenter());
            this.onGround = false;
            if (socket)
                socket.emit('change animation', {
                    animation: 'jump'
                });
        }
    },

});