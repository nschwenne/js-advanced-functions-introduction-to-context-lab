

function createEmployeeRecord(arrayOfInfo) {
   return {
        firstName: arrayOfInfo[0],
        familyName: arrayOfInfo[1],
        title: arrayOfInfo[2],
        payPerHour: arrayOfInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}
function createDateSlicer(typeFinder, dateStamp) {
    return {type: typeFinder, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))
    }
}
function createTimeInEvent(object, dateStamp) {
   object.timeInEvents.push(createDateSlicer("TimeIn", dateStamp))
   return object
}

function createTimeOutEvent(object, dateStamp) {
    object.timeOutEvents.push(createDateSlicer("TimeOut", dateStamp))
    return object
}

function hoursWorkedOnDate(object, dateOfDay) {
let timeIn = object.timeInEvents.find((e) => e.date === dateOfDay).hour
let timeOut = object.timeOutEvents.find((e) => e.date === dateOfDay).hour
return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(object, dateOfDay) {
    let rate = object.payPerHour;
    let hoursWorked = hoursWorkedOnDate(object, dateOfDay)
    return rate * hoursWorked
}

function allWagesFor(object) {
    let netWages = object.timeInEvents.map((day) => {
        return wagesEarnedOnDate(object, day.date)})
        return netWages.reduce((x, y) => x+y)
}

function findEmployeeByFirstName(srcArray, firstName) {
return srcArray.find((data) => data.firstName === firstName)
}

function calculatePayroll(arrayOfRecords) {
let totalNetPay = (arrayOfRecords.map((employee) => {
    return allWagesFor(employee)
}))    
return totalNetPay.reduce((x, y) => x + y)

}