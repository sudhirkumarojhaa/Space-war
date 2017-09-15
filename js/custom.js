
var playerName = prompt("Please Enter your name");

var newPlayer = document.getElementById("name");
newPlayer.innerHTML = playerName;
var blast = $('.blast');
var spaceship = $('#spaceship');

var info = $('.instructions');
$(".infos").click(function () {
  info.show();
});

$(".back").click(function () {
  showWelcome();
  info.hide();
});


var gameplaying = false;
var hitDetect;
var enemyInt;
var space = $('#space');

showWelcome();
$('#space').css({
  'animation-play-state': 'paused'
});

$('.restart').click(function () {
  $('.item').remove();
  $('#spaceship').removeClass().attr('style', '');
  $('.restart').fadeOut();
  setTimeout(function () {
    $('#space').css({
      'animation-play-state': 'running'
    });
    gameplaying = true;
    blast.hide();
    down();
    hitDetect = setInterval(charHit, 5);
    enemyInt = setInterval(createItems, 600);
  }, 500);
});

$('.btnStartGame').click(function () {
  spaceship.show();
  $('.welcome').fadeOut();
  setTimeout(function () {
    $('#space').css({
      'animation-play-state': 'running'
    });
    gameplaying = true;
    down();
    hitDetect = setInterval(charHit, 5);
    enemyInt = setInterval(createItems, 600);
  }, 500);
});

$(document).keydown(function (e) {

  if (e.keyCode == 32) {
    if (gameplaying) {
      $('#spaceship').removeClass('goDown').addClass('spaceshipMove');
    }
  }

});

$(document).keyup(function (evt) {
  if (evt.keyCode == 32) {
    if (gameplaying) {
      $('#spaceship').removeClass('spaceshipMove').addClass('goDown');
    }
  }
});

function down() {

  if (gameplaying) {
    $('#spaceship').removeClass('spaceshipMove').addClass('goDown');
  }
}


function charHit() {

  $('.enemy').each(function () {
    if (rectHit($('#spaceship'), $(this))) {
      var spaceshipPos = $('#spaceship').position().top;
      //remove enemies
      $(this).stop();
      $('#spaceship').css('top', spaceshipPos);
      gameplaying = false;
      blast.show();
      $('#spaceship').hide();
      $('.enemy').hide();
      $('.fuel').hide();


      clearInterval(hitDetect);
      clearInterval(enemyInt);

      $('#space').css({
        'animation-play-state': 'paused'
      });

      showRestartGame();

    }
  });


  $('.fuel').each(function () {
    if (rectHit($('#spaceship'), $(this))) {
      $(this).addClass('fuelFound');
      $('#spaceship').css('top', spaceshipPos);
      setTimeout(function () {
        $(this).remove();
      }, 300);

    }
  });
}

function createItems() {
  var item = $('<div>').addClass('item');
  if (Math.random() > 0.3) {
    item.addClass('enemy');
  } else {
    item.addClass('fuel');
  }
  var eleft = space.width() + 50;
  var etop = Math.random() * (space.height() - 50); //0 to (gameheight-50);

  item.css({
    top: etop,
    left: eleft
  });
  space.append(item);
  item.animate({
    left: -100
  }, 3000, 'linear', function () {
    $(this).remove();
  });
}


//hit detect:
function rectHit(rectone, recttwo) {

  var r1 = $(rectone);
  var r2 = $(recttwo);

  var r1x = r1.offset().left;
  var r1w = r1.width();
  var r1y = r1.offset().top;
  var r1h = r1.height();

  var r2x = r2.offset().left;
  var r2w = r2.width();
  var r2y = r2.offset().top;
  var r2h = r2.height();

  if (r1y + r1h < r2y ||
    r1y > r2y + r2h ||
    r1x > r2x + r2w ||
    r1x + r1w < r2x) {
    return false;
  } else {
    return true;
  }
}

function showWelcome() {
  $('.welcome').fadeIn();
}

function showRestartGame() {
  $('.restart').fadeIn();
}
