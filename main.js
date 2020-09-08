

(function () {
    var datepicker = window.datepicker;
    var monthData; //月份数据
    var $wrapper;
    var $Date;  //选择的时间
    var $Today  //今日年月日（不含时分秒）

    datepicker.buildUI = function (year, month) {
        monthData = datepicker.getMonthData(year, month);
        console.log('buildUI monthdata', JSON.stringify(monthData));
        var datepickerHeaderHtml = '<div class="ui-datepicker-header"><a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a><a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span></div>';
        var datepickerBodyHtml = '<div class="ui-datepicker-body"><table><thead><tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr></thead><tbody>';

        <!-- var weeks = '<tr><td>29</td><td>30</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>'; -->
        var weeks = '';
        var days = monthData.days;
        var dateOfToday=new Date().getDate();
        var monthOfToday=new Date().getMonth()+1;
        var yearOfToday=new Date().getFullYear();
        var hoursOfToday=new Date().getHours();
        var minutesOfToday=new Date().getMinutes();
        var secondsOfToday=new Date().getSeconds();
        $Today=yearOfToday+"-"+monthOfToday+"-"+dateOfToday;

        var todayTime=yearOfToday+"-"+monthOfToday+"-"+dateOfToday+" "+hoursOfToday+":"+minutesOfToday+":"+secondsOfToday;
        //console.log(todayTime);
        for (var i = 0; i < days.length; i++) {
            var currDate = days[i];
            $selectDate = currDate.date;
            if (i % 7 === 0) {
                weeks += '<tr>';
            }            
            if(i == dateOfToday && monthOfToday == monthData.month && yearOfToday == monthData.year){
                weeks += '<td class="ui-datepicker-td active" data-date="' + currDate.date + '">' + currDate.date + '</td>';
            }else{
                weeks += '<td class="ui-datepicker-td" data-date="' + currDate.date + '">' + currDate.showDate + '</td>';
            }
            if (i % 7 === 6) {
                weeks += '</tr>';
            }            
        }

        datepickerBodyHtml = datepickerBodyHtml + weeks + '</tbody></table></div>';

        var datepickerFooterHtml = '<div class="ui-datepicker-footer"><table style="width:100%;" border="0" cellpadding="8"><tr><td colspan="3" style="text-align: center;border-bottom:1px solid gray;"><span style="font-size:14px;">时间</span><input class="ui-datepicker-inputnow" id="ui-datepicker-inputhours" type="text" value="' + hoursOfToday + '">:<input class="ui-datepicker-inputnow" id="ui-datepicker-inputminutes" type="text" value="' + minutesOfToday + '">:<input class="ui-datepicker-inputnow" id="ui-datepicker-inputseconds" type="text" value="' + secondsOfToday + '"></td></tr><tr><td style="text-align:center;"><a class="ui-datepicker-footer-btn ui-datepicker-btn-cancel" id="ui-datepicker-btn-cancel" href="javascript:void(0)">取消</a></td><td style="text-align:center;"><a class="ui-datepicker-footer-btn ui-datepicker-btn-now" id="ui-datepicker-btn-now" href="javascript:void(0)">现在</a></td><td style="text-align:center;"><a class="ui-datepicker-footer-btn ui-datepicker-btn-confirm" id="ui-datepicker-btn-confirm" href="javascript:void(0)">确认</a></td></tr></table>';

        var html = datepickerHeaderHtml + datepickerBodyHtml + datepickerFooterHtml;
        console.log('build UI html', html);
        return html;
    };



    datepicker.render = function (direction) {
        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;        
        }

        if (direction === 'prev') month--;
        if (direction === 'next') month++;

        var html = datepicker.buildUI(year, month);

        //$wrapper = document.querySelector('.ui-datepicker-wrapper');
        if (!$wrapper) {
            console.log('add new wrapper');
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'ui-datepicker-wrapper';
        }

        $wrapper.innerHTML = html;
    };

    datepicker.init = function (input) {
        datepicker.render();

        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;

                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';

                isOpen = true;
            }
        }, false);


        function format(date) {

            var padding = function (num) {
                if (num <= 9) {
                    return '0' + num;
                }

                return num;
            };

            ret = '';
            ret += date.getFullYear() + '-';
            ret += padding(date.getMonth() + 1) + '-';
            ret += padding(date.getDate());
            return ret;
        }

        function formatTime(t){
            if(t<10){
                t = "0" + t;
            }
            return t;
        }  


        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if (!$target.classList.contains('ui-datepicker-btn')) return;

            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev');                             
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }
        }, false);

        
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if ($target.tagName.toLowerCase() !== 'td') return;
            /* 
            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
            $input.value = format(date); 
            */
            $Date = format(new Date(monthData.year, monthData.month - 1, $target.dataset.date));
            $tds=document.querySelectorAll(".ui-datepicker-td");
            $tdnums=$tds.length;
            for(var n=0;n < $tdnums;n++){
                $tds.index = n; 
                $tds[n].onclick = function(){               
                    for(var j=0;j<$tdnums;j++){
                        $tds[j].className = "ui-datepicker-td";
                    };
                    this.className = "ui-datepicker-td active";
                }
            }
            
            // $wrapper.classList.remove('ui-datepicker-wrapper-show');
            // isOpen = false;
        }, true);
        

        $cancel = document.getElementById('ui-datepicker-btn-cancel');
        $cancel.addEventListener('click', function () {
                if (isOpen) {
                    $wrapper.classList.remove('ui-datepicker-wrapper-show');
                    isOpen = false;
                } else {
                    $wrapper.classList.add('ui-datepicker-wrapper-show');
                    isOpen = true;
                }
        },true);         

        var dateOfToday=new Date().getDate();
        var monthOfToday=new Date().getMonth()+1;
        var yearOfToday=new Date().getFullYear();
        var hoursOfToday=new Date().getHours();
        var minutesOfToday=new Date().getMinutes();
        var secondsOfToday=new Date().getSeconds();
        var todayTime=yearOfToday+"-"+monthOfToday+"-"+dateOfToday+" "+hoursOfToday+":"+minutesOfToday+":"+secondsOfToday;        

        $now = document.getElementById('ui-datepicker-btn-now');
        $now.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                document.querySelector(".datepicker").value=todayTime;
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                isOpen = true;
            }
        }); 


        $confirm = document.getElementById('ui-datepicker-btn-confirm');
        $confirm.addEventListener('click', function () {
            
            if (isOpen) {
                $nowhours=document.getElementById('ui-datepicker-inputhours').value;
                $nowminutes=document.getElementById('ui-datepicker-inputminutes').value;
                $nowseconds=document.getElementById('ui-datepicker-inputseconds').value;
                $nowhms = formatTime($nowhours) + ":" + formatTime($nowminutes) + ":" + formatTime($nowseconds);
                if($Date==undefined){
                    $nowTime=$Today +" " + $nowhms;
                } else {
                    $nowTime=$Date + " " + $nowhms;
                }
                
                //console.log($nowTime);
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                document.querySelector(".datepicker").value=$nowTime;
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                isOpen = true;
            }
        }); 
    }
})();