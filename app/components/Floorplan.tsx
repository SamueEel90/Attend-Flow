import React from 'react';
import { Text, View } from 'react-native';
import TShift from '../types/shift';

type FloorplanProps = {
  shifts: TShift[];
};

const TRACK_START_HOUR = 6;
const TRACK_END_HOUR = 22;
const TRACK_HOURS = TRACK_END_HOUR - TRACK_START_HOUR;
const TIMELINE_WIDTH = 260;

const TIMELINE_MARKS = [6, 8, 10, 12, 14, 16, 18, 20, 22];

const DEPARTMENTS = [
  'Veduci',
  'Pokladne',
  'Zelenina',
  'Pulty',
  'Food',
  'NonFood'
];

const formatTime = (date: Date) =>
  date.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' });

const getPositionPxFromDate = (date: Date) => {
  const hours = date.getHours() + date.getMinutes() / 60;
  return Math.min(
    Math.max(((hours - TRACK_START_HOUR) / TRACK_HOURS) * TIMELINE_WIDTH, 0),
    TIMELINE_WIDTH
  );
};

const getPositionPxFromHour = (hour: number) => {
  return ((hour - TRACK_START_HOUR) / TRACK_HOURS) * TIMELINE_WIDTH;
};

const Floorplan: React.FC<FloorplanProps> = ({ shifts }) => {
  // Group shifts by department
  const shiftsByDepartment: { [dep: string]: TShift[] } = {};
  shifts.forEach(shift => {
    const dep = shift.department || 'Iné';
    if (!shiftsByDepartment[dep]) shiftsByDepartment[dep] = [];
    shiftsByDepartment[dep].push(shift);
  });

  return (
    <View className="bg-background rounded-2xl px-2 py-4 my-2 w-full">
      {/* Timeline Grid Header */}
      <View className="flex-row items-center mb-6">
        <Text
          className="text-greenPalette-400 text-lg"
          style={{ width: 110, letterSpacing: 1.2 }}
        >
          
        </Text>
        <View style={{ width: TIMELINE_WIDTH, marginLeft: 8 }}>
          <View style={{ position: 'relative', height: 28 }}>
            {TIMELINE_MARKS.map(hour => (
              <View
                key={hour}
                style={{
                  position: 'absolute',
                  left: getPositionPxFromHour(hour) - 12,
                  width: 24,
                  alignItems: 'center',
                }}
              >
                <Text className="text-white  text-lg">
                  {hour}
                </Text>
                <View
                  className="bg-gray-600"
                  style={{
                    width: 0.5,
                    height: '10000%',
                    marginTop: 2,
                    borderRadius: 1,
                    opacity: 0.8,
                    zIndex: 1,
                  }}
                />
              </View>
            ))}
            
          </View>
        </View>
      </View>
      {/* Departments */}
      {DEPARTMENTS.map(dep =>
        shiftsByDepartment[dep] && shiftsByDepartment[dep].length > 0 ? (
          <View key={dep} style={{ marginBottom: 26 }}>
            {/* Department Header Bar */}
            <View className="flex-row items-center mb-1">
              <View
                style={{
                  width: 6,
                  height: 30,
                  borderRadius: 3,
                  marginRight: 8,
                  backgroundColor: '#19c37d'
                }}
              />
              <Text
                className="text-greenPalette-300 font-bold text-lg"
                style={{
                  width: 102,
                  letterSpacing: 0.5,
                }}
              >
                {dep}
              </Text>
              {/* Separator line */}
              <View
                style={{
                  flex: 1,
                  height: 1.5,
                  backgroundColor: '#2d323d',
                  marginLeft: 10,
                  borderRadius: 1,
                  opacity: 0.3
                }}
              />
            </View>
            {/* Shifts for this department */}
            <View style={{ gap: 8, marginTop: 2 }}>
              {shiftsByDepartment[dep].map((shift, idx) => {
                const shiftStart = new Date(shift.shiftStart);
                const shiftEnd = new Date(shift.shiftEnd);
                const startPx = getPositionPxFromDate(shiftStart);
                const endPx = getPositionPxFromDate(shiftEnd);
                const barWidth = Math.max(endPx - startPx, 6);

                return (
                  <View
                    key={shift._id || idx}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#20242e',
                      borderRadius: 8,
                      paddingVertical: 5,
                      marginBottom: 2,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.06,
                      shadowRadius: 2,
                      elevation: 2,
                    }}
                  >
                    {/* Employee Info */}
                    <View style={{ width: 110, paddingLeft: 5 }}>
                      <Text className="text-greenPalette-50 font-semibold text-base" numberOfLines={1}>
                        {shift.username}
                      </Text>
                      <Text className="text-greenPalette-500  mt-1">
                        {formatTime(shiftStart)} - {formatTime(shiftEnd)}
                      </Text>
                    </View>
                    {/* Timeline row */}
                    <View
                      style={{
                        width: TIMELINE_WIDTH,
                        height: 36,
                        justifyContent: 'center',
                        position: 'relative',
                        marginLeft: 6,
                      }}
                    >
                      {/* Shift bar */}
                      {barWidth > 0 && (
                        <View
                          className="bg-greenPalette-400"
                          style={{
                            position: 'absolute',
                            left: startPx,
                            width: barWidth,
                            top: 18,
                            height: 4,
                            borderRadius: 2,
                            minWidth: 10,
                            zIndex: 2,
                          }}
                        />
                      )}
                      {/* Start Marker */}
                      <View
                        className="border-greenPalette-50"
                        style={{
                          position: 'absolute',
                          left: startPx,
                          width: 2,
                          height: 24,
                          borderRadius: 4,
                          borderWidth: 1,
                          top: 12,
                          zIndex: 3,
                        }}
                      />
                      {/* End Marker */}
                      <View
                        className=" border-greenPalette-50"
                        style={{
                          position: 'absolute',
                          left: endPx - 1,
                          width: 0.5,
                          height: 24,
                          borderRadius: 4,
                          borderWidth: 1,
                          top: 12,
                          zIndex: 3,
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : null
      )}
    </View>
  );
};

export default Floorplan;
