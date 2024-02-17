mcfries = "";
god = "";
status_mcfries = "";
status_god = "";
function preload() {
    mcfries = loadSound("undertale_crab.mp3");
    god = loadSound("pink_panther.mp3");
}
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function gotPoses(results) {
    if (results.length > 0) {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}
//Teacher
function draw() {
    image(video, 0, 0, 600, 500);
    fill("cyan");
    stroke("black");
    status_mcfries = mcfries.isPlaying();
    status_god = god.isPlaying();
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        god.stop();

        if (status_mcfries == false) {
            mcfries.play();
            document.getElementById("song_name").innerHTML = "Mcfries is playing";
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        mcfries.stop();

        if (status_god == false) {
            god.play();
            document.getElementById("song_name").innerHTML = "God is playing";
        }
    }

}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
