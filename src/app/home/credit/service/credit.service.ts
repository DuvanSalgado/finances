import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IcreditModel } from '../model/credit.interface';
@Injectable()
export class CreditService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private month = new Date().getMonth();

  constructor(private fireBase: AngularFirestore) { }

  createCredit(data: IcreditModel): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IcreditModel>('credit');
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }

  getAllCredit(): Observable<Array<IcreditModel>> {
    this.itemsCollection = this.fireBase.collection<IcreditModel[]>('credit', ref => ref.where('month', '>=', this.month));
    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }
}
