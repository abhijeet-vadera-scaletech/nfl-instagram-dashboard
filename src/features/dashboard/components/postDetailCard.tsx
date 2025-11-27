import { ReactNode, useState } from 'react';
import CountUp from 'react-countup';
import Select from 'react-select';
import Card from 'shared/components/card/card';
import { IEngagementRate, IEngagementRateOption } from '../interface/interface';
import { engagementOptions } from 'shared/constants';
import { IconAverage, IconPhoto, IconVideo } from 'shared/icons';

interface IDetailsCardProps {
    label: string;
    icon: ReactNode;
    value: number | null | IEngagementRate;
    appendingString?: string;
    loading: boolean;
    avgRate?: boolean;
}

export default function DetailCard(props: IDetailsCardProps) {
    const { label, icon, value, loading, appendingString, avgRate = false } = props;
    const [selectedOption, setSelectedOption] = useState<IEngagementRateOption>({
        value: 'all',
        label: 'All Time',
    });

    const renderCounts = () => {
        if (!value) return "-"
        const card = avgRate ? "avg" : "regular"
        switch (card) {
            case "avg":
                return (
                    <div className='average-engagement-rate-counts-wrapper'>
                        <h4 title='Engagement rate of photos'>
                            <IconPhoto scale={0.8} />
                            <CountUp
                                decimals={3}
                                end={(value as IEngagementRate)[
                                    selectedOption?.value || 'all'
                                ]?.photo as number}
                                suffix={appendingString || ''}
                            />
                        </h4>
                        <h4 title='Engagement rate of videos'>
                            <IconVideo scale={0.8} />
                            <CountUp
                                decimals={3}
                                end={(value as IEngagementRate)[
                                    selectedOption?.value || 'all'
                                ]?.video as number}
                                suffix={appendingString || ''}
                            />
                        </h4>
                        <h4 title='Average engagement rate of photos & videos'>
                            <IconAverage scale={0.8} />
                            <CountUp
                                decimals={3}
                                end={(value as IEngagementRate)[
                                    selectedOption?.value || 'all'
                                ]?.avg as number}
                                suffix={appendingString || ''}
                            />
                        </h4>
                    </div>
                );

            default:
                return (
                    <h1>
                        <CountUp
                            decimals={avgRate ? 3 : 0}
                            end={value as number}
                            suffix={appendingString || ''}
                        />
                    </h1>
                );
        }
    }
    return (
        <Card loading={loading}>
            <div className="card-header">
                <h3>{label}</h3>
                {icon}
            </div>
            <div>
                {renderCounts()}
                {avgRate && (
                    <Select
                        placeholder="Range"
                        styles={{
                            container: (base: any) => {
                                return {
                                    ...base,
                                    width: '100%',
                                };
                            },
                        }}
                        value={selectedOption}
                        onChange={(value) =>
                            setSelectedOption(value || { value: 'all', label: 'All Time' })
                        }
                        options={engagementOptions}
                    />
                )}
            </div>
        </Card>
    );
}
