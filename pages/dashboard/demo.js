import React, { useEffect, useState } from 'react'
import SparkHeader from '../../components/Header/SparksHeader'
import DefaultLayout from '../../Layouts/default'
import DateRangePicker from 'rsuite/DateRangePicker';

function Charts(props) {
  return (
    <DefaultLayout>
      <h2 style={{
        padding: "50px 0px"
      }}>Dashboard Demo</h2>
      <DateRangePicker style={{
        paddingBottom: "50px"
      }} showOneCalendar placeholder="Selecione os dias" />
      <SparkHeader />
    </DefaultLayout>
  )
}

Charts.auth = {}

export default Charts