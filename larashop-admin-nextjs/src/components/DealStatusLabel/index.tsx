import { FC } from 'react';
import { DealStatus, dealStatusLabel } from '@/types/responseType';
import Label from '../Label';

interface DealStatusLabelProps {
    dealStatus: DealStatus
}

export const DealStatusLabel: FC<DealStatusLabelProps> = ({ dealStatus }) => {

    let color
    switch (dealStatus) {
      case 'listing':
      case 'purchased':
      case 'shipping':
        color = 'info';
        break;
      case 'completed':
        color = 'success';
        break;
      case 'canceled':
        color = 'error';
        break;
      default:
        color = 'warning';
    }
  
    return <Label color={color}>{dealStatusLabel(dealStatus)}</Label>;
  };