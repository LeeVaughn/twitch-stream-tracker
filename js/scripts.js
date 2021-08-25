const names = ["freecodecamp", "csharpfritz", "blizzheroes", "noopkat", "noobs2ninjas", "vtriple", "supremerumham", "sheriffjackson", "jesseskinner", "esl_sc2", "dunktrain"];
let displayName, logo;

names.forEach((name) => {
    const channelAPI = `https://wind-bow.gomix.me/twitch-api/channels/${name}?callback=?`;
    const streamAPI = `https://wind-bow.gomix.me/twitch-api/streams/${name}?callback=?`;

    $.getJSON(channelAPI, function (channel) {
        $.getJSON(streamAPI, function (stream) {

            // There are two different display_name related variables to handle accounts like "blizzheroes"
            // that have special characters in their display_name
            displayName = channel.display_name;
            displayNameRegex = displayName.replace(/[^A-Z0-9_]/ig, "");
            logo = `<img src="${channel.logo}" class="logo">`;

            if (stream.stream != null) {
                $("#names").prepend(`
                    <div class="name on" id="${displayNameRegex}">
                        <a href="//twitch.tv/${name}" target="_blank">${logo}
                            <h2 class="displayName">${displayName}</h2>
                            <div class="game">Currrently streaming <strong>${stream.stream.channel.game}</strong> for ${stream.stream.viewers} viewers.</div>
                            <div class="topic"><em>${stream.stream.channel.status}</em></div>
                        </a>
                    </div>
                `);
            } else {
                $("#names").append(`
                    <div class="name off" id="${displayNameRegex}">
                        <a href="//twitch.tv/${name}" target="_blank">${logo}
                        <h2 class="displayName">${displayName}</h2>
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
