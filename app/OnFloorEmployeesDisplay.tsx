import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelectedDate } from './context/SelectedDateContext'
import UserShifts from './dummyBackend/dummyDB/UserShifts.json'

type Shift = {
  start: string
  end: string
  break: number
}

type EmployeeShift = {
  employee_number: number
  employee_name: string
  shifts: Shift[]
}

export default function AllShiftsDisplay() {
  const [employees, setEmployees] = useState<EmployeeShift[]>([])
  const { date } = useSelectedDate();
  const fetchData = async () => {
    try {
      const data: EmployeeShift[] = UserShifts as EmployeeShift[]
      setEmployees(data)
    } catch (error) {
      console.error('Chyba pri načítaní dát:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text>{date.toLocaleDateString()} </Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
        Všetky zmeny zamestnancov
      </Text>
      {employees.length === 0 ? (
        <Text>Žiadne zmeny na zobrazenie.</Text>
      ) : (
        employees.map(emp => (
          <View key={emp.employee_number} style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 6 }}>
              {emp.employee_name} (#{emp.employee_number})
            </Text>
            {emp.shifts.map((shift, index) => (
              <Text key={index} style={{ marginLeft: 8 }}>
                {new Date(shift.start).toLocaleString()} - {new Date(shift.end).toLocaleString()} (Prestávka: {shift.break} min)
              </Text>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  )
}
