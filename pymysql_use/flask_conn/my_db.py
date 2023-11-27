from completedloan import completedloan

class Database:
    def __init__(self) -> None:
        self.loans = {}
        self.last_loan_key = 0
    
    def add_loan(self, loan):
        self.last_loan_key += 1
        self.loans[self.last_loan_key] = loan
        return self.last_loan_key
    
    def delete_loan(self, loan_id):
        if loan_id in self.loans:
            del self.loans[loan_id]
    
    def get_loan(self, loan_id):
        loan = self.loans.get(loan_id)
        if loan is None:
            return None
        
        loan_ = completedloan(loan.loan_id, loan.account_id, loan.account_id, loan.amount, 
                              loan.duration, loan.payments, loan.status, loan.year, loan.month, 
                              loan.day, loan.date, loan.fulldate, loan.location, loan.purpose)
        
        return loan_
    
    def get_loans(self):
        loans = []
        for loan_id, loan in self.loans.items():
            loan_ = completedloan(
                loan.loan_id, loan.account_id, loan.amount,
                loan.duration, loan.payments, loan.status, loan.year, loan.month, 
                loan.day, loan.date, loan.fulldate, loan.location, loan.purpose
            )
            loans.append((loan_id, loan_))
        print(loans)
        return loans
