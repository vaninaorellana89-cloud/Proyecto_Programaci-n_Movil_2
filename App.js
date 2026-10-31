import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from 'react-native';

export default function App() {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('Alimentación');
  const [gastos, setGastos] = useState([]);

  const categorias = [
    'Alimentación',
    'Transporte',
    'Entretenimiento',
    'Salud',
    'Otros',
  ];

  function agregarGasto() {
    const importe = Number(monto.trim().replace(',', '.'));

    if (descripcion.trim() === '') {
      Alert.alert('Falta información', 'Escribí la descripción del gasto.');
      return;
    }

    if (!Number.isFinite(importe) || importe <= 0) {
      Alert.alert('Monto incorrecto', 'Ingresá un monto mayor que cero, sin puntos de miles.');
      return;
    }

    const nuevoGasto = {
      id: Date.now().toString() + Math.random().toString(),
      descripcion: descripcion.trim(),
      monto: importe,
      categoria: categoria,
    };

    setGastos([...gastos, nuevoGasto]);
    setDescripcion('');
    setMonto('');
  }

  function eliminarGasto(id) {
    const gastosRestantes = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosRestantes);
  }

  const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Mis gastos personales</Text>

        <TextInput
          placeholder="Descripción del gasto"
          placeholderTextColor="#986078"
          value={descripcion}
          onChangeText={setDescripcion}
          style={styles.campo}
        />

        <TextInput
          placeholder="Monto: por ejemplo, 15000"
          placeholderTextColor="#986078"
          value={monto}
          onChangeText={setMonto}
          keyboardType="decimal-pad"
          style={styles.campo}
        />

        <Text style={styles.subtitulo}>Elegí una categoría</Text>

        {categorias.map((opcion) => (
          <View key={opcion} style={styles.botonCategoria}>
            <Button
              title={categoria === opcion ? '✓ ' + opcion : opcion}
              color={categoria === opcion ? '#A83265' : '#D65A91'}
              onPress={() => setCategoria(opcion)}
            />
          </View>
        ))}

        <View style={styles.botonAgregar}>
          <Button
            title="Agregar gasto"
            color="#A83265"
            onPress={agregarGasto}
          />
        </View>

        <Text style={styles.total}>
          Total gastado: ${total.toFixed(2)}
        </Text>

        <Text style={styles.subtitulo}>Gastos registrados</Text>

        {gastos.length === 0 ? (
          <Text style={styles.mensaje}>Todavía no agregaste gastos.</Text>
        ) : (
          gastos.map((gasto) => (
            <View key={gasto.id} style={styles.tarjeta}>
              <Text style={styles.descripcion}>
                {gasto.descripcion}
              </Text>

              <Text style={styles.detalle}>
                ${gasto.monto.toFixed(2)} - {gasto.categoria}
              </Text>

              <Button
                title="Eliminar"
                color="#D65A91"
                onPress={() => eliminarGasto(gasto.id)}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  contenido: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titulo: {
    color: '#A83265',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  campo: {
    borderWidth: 1,
    borderColor: '#D65A91',
    backgroundColor: '#FFFFFF',
    color: '#A83265',
    padding: 12,
    marginBottom: 14,
    borderRadius: 8,
  },
  subtitulo: {
    color: '#A83265',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
  botonCategoria: {
    marginBottom: 8,
  },
  botonAgregar: {
    marginTop: 16,
  },
  total: {
    color: '#A83265',
    backgroundColor: '#FAD5E5',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    textAlign: 'center',
  },
  mensaje: {
    color: '#986078',
    textAlign: 'center',
    marginTop: 10,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D65A91',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  descripcion: {
    color: '#A83265',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalle: {
    color: '#986078',
    fontSize: 16,
    marginTop: 6,
    marginBottom: 12,
  },
});