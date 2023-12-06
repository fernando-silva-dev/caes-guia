import React, { useEffect, useState, useRef } from 'react';

import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  Agenda,
  Day,
  Inject, Month,
  RecurrenceEditorComponent,
  ScheduleComponent, Week, WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import api from '~/services/api';
import { BroodEventTemplate } from '~/models/BroodEvent';
import { Brood } from '~/models/Brood';

interface BroodEventListProps {
  brood: Brood
}

interface CalendarBook {
  Id: string | undefined;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
}
export default function BroodEventList(props: BroodEventListProps) {
  const { brood } = props;

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [broodEventTemplates, setBroodEventTemplates] = useState<BroodEventTemplate[]>([]);

  const scheduleObj = useRef<ScheduleComponent>(null);
  const [dataSource, setDataSource] = useState<Record<string, any>[] | undefined>([]);

  const recObject = useRef<RecurrenceEditorComponent>(null);
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    const values: CalendarBook[] = broodEventTemplates
      .map(({ id, recurrenceRule, description }) => {
        const dates = recObject?.current?.getRecurrenceDates(
        // @ts-ignore
          new Date(),
          recurrenceRule,
          undefined,
          12,
          undefined,
        );
        if (!dates) {
          return undefined;
        }

        return dates.map((date) => {
          const startDate = new Date(date);
          startDate.setHours(0, 0, 0);

          const endDate = new Date(date);
          endDate.setHours(0, 0, 0);

          return {
            Id: id,
            Subject: description,
            StartTime: startDate,
            EndTime: endDate,
          };
        });
      }).flat().filter((value) => value !== undefined);
    console.log(values);
    return setDataSource(values);
  }, [broodEventTemplates]);

  const fetchBroodEventsTemplate = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('BroodEventTemplate', {});
      const { data } = response.data;

      setBroodEventTemplates(data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBroodEventsTemplate();
  }, []);

  return (
    <Container>
      <div>
        {/* <h4 className="d-inline-block">Eventos de Ninhada</h4> */}
      </div>

      <ScheduleComponent
        ref={scheduleObj}
        width="100%"
        height="550px"
        selectedDate={new Date()}
        eventSettings={{ dataSource }}
        eventClick={async ({ event }:{ event: CalendarBook }) => {
          await api.post('BroodEvent', {
            date: new Date().toISOString(),
            broodId: brood.id,
            broodEventTemplateId: event.Id });

          toast.success('Evento gerado com sucesso!');
        }}

      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>

      <div className="RecurrenceEditor" style={{ display: 'none' }}>
        <RecurrenceEditorComponent id="RecurrenceEditor" ref={recObject} />
      </div>
    </Container>
  );
}
