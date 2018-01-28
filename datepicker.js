window.onload = function() {
  var datePickerTpl = '<div class="yearMonth"><a class="previous">&lsaquo;</a><span class="year">{y}</span>-<span class="month">{m}</span><a class="next">&rsaquo;</a></div><div class="days"><a>1</a><a>2</a><a>3</a><a>4</a><a>5</a><a>6</a><a>7</a><a>8</a><a>9</a><a>10</a><a>11</a><a>12</a><a>13</a><a>14</a><a>15</a><a>16</a><a>17</a><a>18</a><a>19</a><a>20</a><a>21</a><a>22</a><a>23</a><a>24</a><a>25</a><a>26</a><a>27</a><a>28</a><a>29</a><a>30</a><a>31</a>';

  function daysInMonth(month, year) {
  	return new Date(year, month, 0).getDate();
  }

  function hideInvalidDays(dp, month, year){
    dp.querySelectorAll(".days a").forEach(function(a){
      a.style.display = "inline-block";
    });
    var days = daysInMonth(month, year);
    var invalidCount = 31 - days;
    if(invalidCount > 0) {
      for (var j = 1; j <= invalidCount; j++) {
        dp.querySelector(".days a:nth-last-child(" + j + ")").style.display = "none";
      }
    }
  }

  function clearSelected(dp) {
  	dp.querySelectorAll(".days a.selected").forEach(function(e){
      e.classList.remove("selected");
    });
  }

  function setMonthYear(dp, month, year, input) {
    dp.querySelector(".month").textContent = String(month).padStart(2, "0");
    dp.querySelector(".year").textContent = year;
		clearSelected(dp);
    hideInvalidDays(dp, month, year);
    if(input && input.value) {
      var date = input.value.split("-");
      var [curYear, curMonth] = [parseInt(dp.querySelector(".year").textContent), parseInt(dp.querySelector(".month").textContent)];
      if(date[0] == curYear && date[1] == curMonth) {
      	dp.querySelector(".days a:nth-child(" + parseInt(date[2]) + ")").className = "selected";
      }
    }
  }

  document.querySelectorAll(".datepicker").forEach(function(input) {
  	input.setAttribute("readonly", "true");
  	var dp = document.createElement("div");
    dp.className = "contextmenu";
    dp.style.left = input.offsetLeft + "px";
    dp.style.top = input.offsetTop + input.offsetHeight + "px";
    var now = new Date();
    dp.insertAdjacentHTML('beforeEnd', datePickerTpl.replace("{m}", String(now.getMonth() + 1).padStart(2, "0")).replace("{y}", now.getFullYear()));
    hideInvalidDays(dp, now.getMonth() + 1, now.getFullYear());
   
    dp.querySelector("a.previous").addEventListener("click", function(e){
      var [curYear, curMonth] = [parseInt(dp.querySelector(".year").textContent), parseInt(dp.querySelector(".month").textContent)];
      var firstMonth = curMonth - 1 == 0;
      setMonthYear(dp, firstMonth ? 12 : curMonth - 1, firstMonth ? curYear - 1 : curYear, input);
    });
    
    dp.querySelector("a.next").addEventListener("click", function(e){
      var [curYear, curMonth] = [parseInt(dp.querySelector(".year").textContent), parseInt(dp.querySelector(".month").textContent)];
      var lastMonth = curMonth + 1 == 13;
      setMonthYear(dp, lastMonth ? 1 : curMonth + 1, lastMonth ? curYear + 1 : curYear, input);
    });
    
    dp.querySelectorAll(".days a").forEach(function(a){
    	a.addEventListener("click", function(e) {
    		clearSelected(dp);
    		e.target.className = "selected";
    		input.value = dp.querySelector(".year").textContent + "-" + dp.querySelector(".month").textContent + "-" + this.text.padStart(2, "0");
      });
    });
    
    input.parentNode.insertBefore(dp, input.nextSibling);

    input.addEventListener("focus", function(){
      if (input.value){
        var date = input.value.split("-");
        setMonthYear(dp, date[1], date[0]);
        dp.querySelector(".days a:nth-child(" + parseInt(date[2]) + ")").className = "selected";
      }
    });
  });
};



