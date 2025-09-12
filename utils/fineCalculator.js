function calculateFine(borrowDate, returnDate) {
    const allowedDays = parseInt(process.env.ALLOWED_BORROW_DAYS);
    const fineRate = parseInt(process.env.FINE_RATE);
    const borrow = new Date(borrowDate);
    const returned = new Date(returnDate);
    const diffDays = Math.floor((returned - borrow) / (1000 * 60 * 60 * 24));
    const overdueDays = diffDays - allowedDays;
    return overdueDays > 0 ? overdueDays * fineRate : 0;
}

module.exports = calculateFine;
