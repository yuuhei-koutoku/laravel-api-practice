import React, { FC } from "react";
import type { DealEventActorType, DealForMyPage, DealEvent } from '@/types/responseType'
import { actorLabel, dealEventTypeLabel } from '@/types/responseType'
import { formatDatetime } from '@/utils/formatDatetime'

export interface DealEventsProps {
  dealForMyPage: DealForMyPage
  yourActorType: DealEventActorType
}

const actorLabelForYourActor = (yourActorType: DealEventActorType) => {
  return (eventActorType: DealEventActorType) => {
    actorLabel(eventActorType, yourActorType)
  }
}

const DealEvent = (yourActorType: DealEventActorType) => (dealEvent: DealEvent, index: number) => {
  const { actorType, eventType, createdAt } = dealEvent
  return (
    <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-1">{formatDatetime(createdAt)}</div>
          <div className="flex-1">{actorLabel(actorType, yourActorType)}</div>
          <div className="flex-1">
            <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-bold text-indigo-800 bg-indigo-100">{dealEventTypeLabel(eventType)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DealEvents: FC<DealEventsProps> = ({
  dealForMyPage,
  yourActorType
}) => {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
        <h3 className="text-xl sm:text-2xl font-semibold">取引履歴</h3>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
        {dealForMyPage.dealEvents.map(DealEvent(yourActorType))}
      </div>
    </div>
  );
}

export default DealEvents