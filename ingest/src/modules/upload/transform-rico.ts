import { RicoRecordSet } from './model';

interface Prop {
  id?: string;
  title?: string;
  path?: string;
}

const walkRico = (recordSet: RicoRecordSet): { props: Prop[]; date: any } => {
  const ids: string[] = [];
  const props: Prop[] = [];
  let date = '';
  let eadId: string | undefined;
  let currentSet: RicoRecordSet | undefined = recordSet;

  while (currentSet !== undefined) {
    const rs: RicoRecordSet | undefined = currentSet['rico:RecordSet'];

    if (!rs) {
      currentSet = undefined;
      continue;
    }

    const prop: Prop = {
      id: rs['rico:identifier'],
      title: rs['rico:title'],
    };

    if (rs?.['rico:date'] && date === '') {
      date = rs['rico:date'];
    }

    props.push(prop);

    if (rs?.['rico:includedIn']) {
      currentSet = rs['rico:includedIn'];
    }

    if (rs?.['rico:isDescribedBy']) {
      const record = rs['rico:isDescribedBy']['rico:Record'];
      eadId = record?.['rico:identifier'];
      currentSet = undefined;
      props.push({
        id: record?.['rico:managedBy'],
        title: record?.['rico:publishedBy'],
      });
    }
  }

  props.reverse().forEach((prop) => {
    let path = '';

    if (ids.length === 1) {
      prop.id = eadId;
    }

    if (prop.id) {
      ids.push(prop.id);
    }

    ids.forEach((id) => {
      path = `${path}|${id}`;
    });

    prop.path = path;
  });

  return {
    props,
    date,
  };
};

const transformRico = (
  recordset: RicoRecordSet
): { propList: Prop[]; dateList: number[] } => {
  const dateList: number[] = [];
  const propList: Prop[] = [];

  recordset['rico:includes']?.forEach((value: RicoRecordSet) => {
    const { props, date } = walkRico(value);

    if (date !== '') {
      const parts = date.split('/');

      if (parts.length === 1) {
        const y = parts[0].slice(0, 4);

        if (!dateList.includes(y)) {
          dateList.push(y);
        }
      }

      if (parts.length === 2) {
        const y1 = parts[0].slice(0, 4);
        const y2 = parts[1].slice(0, 4);

        if (!dateList.includes(y1)) {
          dateList.push(Number(y1));
        }

        if (!dateList.includes(y2)) {
          dateList.push(Number(y2));
        }
      }

      props.forEach((prop: Prop) => {
        let shouldAppend = true;

        propList.forEach((i: Prop) => {
          if (i.path === prop.path) {
            shouldAppend = false;
            return;
          }
        });

        if (shouldAppend) {
          propList.push(prop);
        }
      });
    }
  });

  return {
    propList,
    dateList,
  };
};

export default transformRico;
