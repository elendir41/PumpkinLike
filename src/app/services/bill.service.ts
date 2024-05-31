import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Bill } from '../models/bill.model';
import { User } from '../models/user.model';


import { collection, query, getDocs,where, onSnapshot } from "firebase/firestore";
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private db: AngularFirestore, private authService: AuthService) {
    // this.getAllBillOfUser();
    this.listenBillsChanges();
  }

  private billSubject = new Subject<void>();
  private billUpdateSubject = new Subject<Bill>();
  private billAddSubject = new Subject<Bill>();
  private billRemoveSubject = new Subject<Bill>();

  billsCol = this.db.collection("/Bills");

  bills: Bill[] = [];

  billsRef = collection(this.db.firestore, "Bills");
  q = query(this.billsRef, where(`balance.${this.authService.currentUserUid}`, "!=", null));

  addBill(bill: Bill): void { 
    bill.id = this.db.createId();
    this.updateBill(bill);
  }

  updateBill(bill: Bill): void {
    this.billsCol.doc(bill.id).set(bill);
  }

  async getAllBillOfUser(): Promise<Bill[]> {
    if (!this.authService.currentUserUid || this.authService.currentUserUid === "")
      return [];
    // const bills: Bill[] = [];
    const billsRef = collection(this.db.firestore, "Bills");

    // Create a query against the collection.
    
    const q = query(billsRef, where(`balance.${this.authService.currentUserUid}`, "!=", null));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {        
      // this.bills.push(doc.data() as Bill)
    });
    // return this.bills;
    return [];
  }

  listenBillsChanges() {
    onSnapshot(this.q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const bill: Bill = change.doc.data() as Bill;
          this.bills.push(bill)
          console.log("ajout d'ardoise");
          this.billSubject.next();
        }
        if (change.type === "modified") {
          const index = this.bills.findIndex(bill => {
            return bill.id === change.doc.id;
          })
          if (index !== -1) {
            const bill: Bill = change.doc.data() as Bill;
            this.bills[index] = bill;
            console.log("modification d'ardoise");
            this.billSubject.next();
            // this.billUpdateSubject.next(bill);
          }
        }
        if (change.type === "removed") {
          const index = this.bills.findIndex(bill => {
            return bill.id === change.doc.id
          })
          if (index !== -1) {
            this.bills.splice(index, 1);
            console.log("suppression d'ardoise");
            const bill: Bill = change.doc.data() as Bill;
            this.billSubject.next();
            // this.billRemoveSubject.next(bill);
          }
        }
      })
    })
  }

  getBillUpdateObservable(): Observable<Bill> {
    return this.billUpdateSubject.asObservable();
  }

  getBillAddObservable(): Observable<Bill> {
    return this.billAddSubject.asObservable();
  }

  getBillRemoveObservable(): Observable<Bill> {
    return this.billRemoveSubject.asObservable();
  }

  getBillObservable(): Observable<void> {
    return this.billSubject.asObservable();
  }
}
