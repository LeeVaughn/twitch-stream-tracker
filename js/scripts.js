const names = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let logo;

names.forEach((name) => {
    // the first request gets information on the streamer, the second gets information on the stream
    const channelAPI = `https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/${name}?callback=?`;
    const streamAPI = `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${name}?callback=?`;

    $.getJSON(channelAPI, function (channel) {
        $.getJSON(streamAPI, function (stream) {
            logo = `<img src="${channel.logo}" class="logo">`;

            if (stream.stream != null) {
                $("#names").prepend(`
                    <div class="name on" id="${channel.display_name}">
                        <a href="https://twitch.tv/${name}" target="_blank">${logo}
                            <h2 class="channel.display_name">${channel.display_name}</h2>
                            <div class="game">Currently streaming <strong>${stream.stream.channel.game}</strong> for ${stream.stream.viewers} viewers.</div>
                            <div class="topic"><em>${stream.stream.channel.status}</em></div>
                        </a>
                    </div>
                `);
            } else {
                $("#names").append(`
                    <div class="name off" id="${channel.display_name}">
                        <a href="//twitch.tv/${name}" target="_blank">${logo}
                        <h2 class="channel.display_name">${channel.display_name}</h2>
                        </a>
                    </div>
                `);
            }

            if (channel.logo === null) {
                channel.logo = "http://www-cdn.jtvnw.net/images/xarth/404_user_150x150.png";
            }
    
        });

        $("#all").click(function () {
            $("#all").addClass("active");
            $("#online").removeClass("active");
            $("#offline").removeClass("active");

            $(".name").show();
        });

        $("#online").click(function () {
            $("#all").removeClass("active");
            $("#online").addClass("active");
            $("#offline").removeClass("active");

            $(".on").show();
            $(".off").hide();
        });

        $("#offline").click(function () {
            $("#all").removeClass("active");
            $("#online").removeClass("active");
            $("#offline").addClass("active");

            $(".off").show();
            $(".on").hide();
        });
    });
});
