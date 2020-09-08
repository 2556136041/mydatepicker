(function () {
    var datepicker = {};

    datepicker.getMonthData = function (year, month) {
        
        var ret = [];
        if (!year || !month ) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }
        console.log(`year = ${year}, month = ${month}`);

        var firstDay = new Date(year, month - 1, 1); // 当月第一天
        var firstDayWeekDay = firstDay.getDay();
        if (firstDayWeekDay === 0) {
            firstDayWeekDay = 7;
        }

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        var preMonthDayCount = firstDayWeekDay - 1; // 需要显示上个月的几天，周一不需要显示

        var lastDay = new Date(year, month, 0); // 当月最后一天
        var lastDate = lastDay.getDate();

        for (var i = 0; i < 7 * 5; i++) {  //5周
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;

            if (date <= 0) {
                // 上个月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {
                // 下个月
                this.month = month + 1;
                showDate = showDate - lastDate;
            }

            if (thisMonth == 0) {
                thisMonth = 12;
            }
            if (thisMonth == 13) {
                thisMonth = 1;
            }
            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            })
        }

        return {
            year,
            month,
            days: ret
        };
    }

    window.datepicker = datepicker;
})();