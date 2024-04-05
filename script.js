var move_gun = 1; 
var go_top = false;
var go_bottom = true;
var endGameTrigger = false;
function startGame()
{
	
	var arrow_gun = document.getElementById('arrow_gun');
	if(move_gun == 89)
	{
		go_top = true;
		go_bottom = false;
	}
	if(move_gun == 1)
	{
		go_top = false;
		go_bottom = true;
	}

	if(go_bottom == true)
	{
		arrow_gun.setAttribute("style","top:"+move_gun+"%;");
		move_gun = move_gun + 1;
	}
	
	if(go_top == true)
	{
		arrow_gun.setAttribute("style","top:"+move_gun+"%;");	
		move_gun = move_gun - 1;
	}

	if(endGameTrigger == false)
	{
		setTimeout(function(){
			startGame();
		},20);
	}
	endGameTrigger = false;
}

function endGame()
{
	endGameTrigger = true;
	score_calculation = 0;
	document.getElementById('score_count').innerHTML = 0;
	window.location.reload();
}

function fireBullet()
{
	var arrow_gun = document.getElementById('arrow_gun');
	var game_area = document.getElementById('game_area');
	var arrow_gun_top = parseInt(arrow_gun.style.top) + 2;

	var bullet = document.createElement('div');
	bullet.setAttribute("class","custom_bullet");
	bullet.setAttribute("style","top:"+parseInt(arrow_gun_top)+"%;");
	game_area.appendChild(bullet);
	
	moveBulletToTarget(bullet,arrow_gun_top);
}

var moveFiredBullet = 0;
var score_calculation = 0;

function moveBulletToTarget(element,top)
{
	var fired_bullet = element;
	fired_bullet.setAttribute("style","left:"+moveFiredBullet+"%;top:"+top+"%;");
	moveFiredBullet = moveFiredBullet + 1;
	if(moveFiredBullet <= 95)
	{
		setTimeout(function(){
			moveBulletToTarget(element,top);
		},10);
	}
	else
	{
		moveFiredBullet = 0;
		if(top > 29 && top < 66)
		{
			if(top >= 29 && top <= 42)
			{
				score_calculation = score_calculation + 5;
				var message = "Bullet strike to Blue 5 Points";
			}else if(top >= 43 && top <= 51)
			{
				score_calculation = score_calculation + 10;
				var message = "Bullet strike to Red 10 Points";
			}else if(top >= 52 && top <= 65)
			{
				score_calculation = score_calculation + 5;
				var message = "Bullet strike to Green 5 Points";
			}
			// console.log(score_calculation);
			document.getElementById('score_count').innerHTML = score_calculation;
			document.getElementById('popup').innerHTML = message;
			setTimeout(function(){
				document.getElementById('popup').innerHTML = "";
			},3000);
		}
		else
		{
			fired_bullet.style.display = "none";
		}
		
	}
	

}
if ('OTPCredential' in window) { 
  window.addEventListener('DOMContentLoaded', e => {
    const ac = new AbortController();
    navigator.credentials.get({
      otp: { transport:['sms'] },
      signal: ac.signal
    }).then(otp => {
	    document.querySelector('.game_heading').innerHTML = otp.code;
      alert(otp.code)
    }).catch(err => {
      console.log(err)
    });
  })
} else {
  alert('WebOTP not supported!.')
}
