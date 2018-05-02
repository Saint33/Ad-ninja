import moment from 'moment';

export const formatDate = (date) => {
    let formattedDate;
    if (moment(date).isSame(moment(), "day")){
        formattedDate = `Сегодня ${moment(date).format("HH:mm")}`
    } else {
        formattedDate = moment(date).format("D MMMM HH:mm")
    }
    return formattedDate;
}

export const memberSince = (date) => {
    return moment(date).format("MMMM YYYY")
}