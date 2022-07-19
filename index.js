/* Your Code Here */

function createEmployeeRecord(employee) {
    // console.log(employee)
    let obj = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj;
}

function createEmployeeRecords(arrOfEmployees){
    // console.log(arrOfArr)
    return arrOfEmployees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(dateStamp) {
    // console.log('dateStamp: ----------->', dateStamp)
    let [date, hour] = dateStamp.split(' ')
    let newObj = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    };
    // console.log('hour: ', hour)
    // console.log('date: ', date)
    // console.log('this after: ', this)
    
    this.timeInEvents.push(newObj)
    return this;
}

function createTimeOutEvent(dateStamp) {
    // console.log('dateStamp: ----------->', dateStamp)
    let [date, hour] = dateStamp.split(' ')
    let newObj = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    };
    // console.log('hour: ', hour)
    // console.log('date: ', date)
    // console.log('this after: ', this)
    
    this.timeOutEvents.push(newObj)
    return this;
}


function hoursWorkedOnDate(dateOfForm) {
    // console.log('date of form: ', dateOfForm)
    // console.log('this: ', this)

       let clockInDate = this.timeInEvents.find(key => key.date === dateOfForm)
       let clockOutDate = this.timeOutEvents.find(key => key.date === dateOfForm)
    //    console.log('clock in: ', clockInDate)
    //    console.log('clockOutDate Hour: ', clockOutDate.hour)
    //    console.log('clockInDate Hour: ', clockInDate.hour)

       return (clockOutDate.hour - clockInDate.hour)/100
        
    }

function wagesEarnedOnDate(dateOfForm) {
//    console.log('this: ', this) 
//    console.log('date of form: ', dateOfForm)
   const hours = hoursWorkedOnDate.call(this, dateOfForm)
//    console.log('hours: ', hours)
   return this.payPerHour*hours
   
}
   
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    // console.log('this: ', this)
    const eligibleDates = this.timeInEvents.map(function (e) {
        // console.log('e: ', e)
        return e.date
    })

    // console.log('eligble dates: ', eligibleDates)
    const payable = eligibleDates.reduce(function (memo, d) {
        // console.log('memo: ', memo)
        // console.log('d ', d)
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function findEmployeeByFirstName(srcArray, firstNameString) {
    // console.log('srcArray: ', srcArray)
    // console.log('firstName: ', firstNameString)
    // console.log('this: ', this)

   const found = srcArray.find(key => key.firstName === firstNameString)
   return found
}


function calculatePayroll(arrayEmpRec) {
    // console.log('array of employee records: ', arrayEmpRec)
    
    const record = arrayEmpRec.map(employee => allWagesFor.call(employee))
    // console.log('record: ', record)

    return record.reduce((acc, total) => acc += total)
}