import {openDatabase} from 'react-native-sqlite-storage';

export interface ClientDB {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  whatsapp: string;
  email: string;
  deliveryWeekDays: string;
  deliveryStartTime: string;
  deliveryEndTime: string;
  contactPreference: string;
  businessType: string;
  traceableDelivery: string;
  state: string;
}

interface ColumnAndValue {
  column: string;
  value: string;
}
interface WhereClauses extends ColumnAndValue {
  operation: string;
}

const getDBConnection = async () => {
  return openDatabase({name: 'final.db', location: 'default'});
};

async function execTransactionDB(queryParams: string) {
  const db = await getDBConnection();
  console.log('SUCESSO', query);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(queryParams, [], (tx, res) => {
        const result: ClientDB[] = [];
        console.log('SUCESSO Query', query);
        console.log('Result', res.rows);
        for (let i = 0; i < res.rows.length; i++) {
          result.push(res.rows.item(i));
        }
        resolve(result);
      }),
        () => {
          console.log('Erro Query', query);
          reject([]);
        };
    });
  });
}

export async function createDataBase() {
  const queryUsers = `CREATE TABLE IF NOT EXISTS Users (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      );`;

  const queryClients = `CREATE TABLE IF NOT EXISTS Clients (
        id TEXT NOT NULL PRIMARY KEY,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        phone TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        email TEXT NOT NULL,
        deliveryWeekDays TEXT NOT NULL,
        deliveryStartTime TEXT NOT NULL,
        deliveryEndTime TEXT NOT NULL,
        contactPreference TEXT NOT NULL,
        businessType TEXT NOT NULL,
        traceableDelivery TEXT NOT NULL,
        state TEXT NOT NULL
      );`;
  await execTransactionDB(queryUsers);
  await execTransactionDB(queryClients);
}

export async function query(
  objectName: string,
  whereClauses: WhereClauses[],
): Promise<ClientDB[]> {
  let queryAux = ` SELECT * FROM ${objectName} `;
  let result: ClientDB[] = [];

  for (let i = 0; i < whereClauses.length; i++) {
    const el = whereClauses[i];
    i === 0
      ? (queryAux += `WHERE ${el.column} ${el.operation} ${el.value}`)
      : `AND ${el.column} ${el.operation} ${el.value}`;
  }

  result = (await execTransactionDB(queryAux)) as ClientDB[];

  return new Promise((resolve, _) => {
    resolve(result);
  });
}

export async function insert(objectName: string, values: ColumnAndValue[]) {
  let queryAux = `
    INSERT INTO ${objectName}
    (${values.map(el => el.column).join()})
     VALUES
     (${values.map(el => `'${el.value}'`).join()})
  `;
  await execTransactionDB(queryAux);
}

function prepareValuesUpadte(values: ColumnAndValue[]) {
  let term = '';
  for (let i = 0; i < values.length; i++) {
    const el = values[i];
    if (i !== values.length - 1) {
      term += `${el.column} = '${el.value}', `;
    } else {
      term += `${el.column} = '${el.value}' `;
    }
  }
  return term;
}

export async function update(objectName: string, values: ColumnAndValue[]) {
  let queryAux = `
    UPDATE  ${objectName}
    SET ${prepareValuesUpadte(values)}
     WHERE id = '${values.filter(el => el.column === 'id').map(el => el.value)}'
  `;
  await execTransactionDB(queryAux);
}

export async function deleteLocal(objectName: string, id: string) {
  let queryAux = `
    DELETE FROM  ${objectName}
     WHERE id = '${id}'
  `;
  await execTransactionDB(queryAux);
}
