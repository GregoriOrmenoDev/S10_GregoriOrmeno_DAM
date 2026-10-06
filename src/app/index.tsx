import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';

import { AppInput } from '../components/common/app-input';
import { AppButton } from '../components/common/app-button';

import {
  validarNombreProducto,
  validarPrecio,
  validarCategoria,
  validarStock,
} from '../utils/validators';

// Categorías disponibles para seleccionar
const CATEGORIAS = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes'];

export default function RegistroProducto() {

  // ── Estados del formulario ──────────────────────────────────────
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');

  // Controla si el selector de categorías está abierto
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  // Mensajes de feedback
  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);

  // ── Validaciones en tiempo real ─────────────────────────────────
  const nombreValido    = validarNombreProducto(nombre);
  const precioValido    = validarPrecio(precio);
  const categoriaValida = validarCategoria(categoria);
  const stockValido     = validarStock(stock);

  // Limpia mensajes al modificar cualquier campo
  const limpiarFeedback = () => {
    setError('');
    setRegistrado(false);
  };

  // ── Envío del formulario ────────────────────────────────────────
  const handleGuardar = () => {
    limpiarFeedback();

    if (!nombreValido) {
      setError('El nombre del producto es obligatorio.');
      return;
    }
    if (!precioValido) {
      setError('El precio debe ser un número mayor a 0.');
      return;
    }
    if (!categoriaValida) {
      setError('Selecciona una categoría.');
      return;
    }
    if (!stockValido) {
      setError('El stock debe ser un número entero válido (≥ 0).');
      return;
    }

    setRegistrado(true);
  };

  // ── Reinicio del formulario ─────────────────────────────────────
  const handleNuevoProducto = () => {
    setNombre('');
    setPrecio('');
    setCategoria('');
    setStock('');
    setError('');
    setRegistrado(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── ENCABEZADO ── */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>📦</Text>
          </View>
          <View>
            <Text style={styles.overline}>INVENTARIO</Text>
            <Text style={styles.title}>Registro de Producto</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Completa los datos del producto. Todos los campos son obligatorios.
        </Text>


        {/* ── TARJETA DEL FORMULARIO ── */}
        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>Datos del producto</Text>
          <Text style={styles.sectionDescription}>
            Ingresa la información correctamente antes de guardar.
          </Text>


          {/* NOMBRE */}
          <AppInput
            label="Nombre del producto"
            placeholder="Ej: Auriculares Bluetooth"
            value={nombre}
            onChangeText={(v) => { setNombre(v); limpiarFeedback(); }}
          />
          {nombre.length > 0 && (
            <Text style={[styles.fieldStatus, nombreValido ? styles.validText : styles.invalidText]}>
              {nombreValido ? '✓ Nombre válido' : '○ El nombre no puede estar vacío'}
            </Text>
          )}


          {/* PRECIO */}
          <AppInput
            label="Precio (S/)"
            placeholder="Ej: 149.90"
            value={precio}
            onChangeText={(v) => { setPrecio(v); limpiarFeedback(); }}
            keyboardType="numeric"
          />
          {precio.length > 0 && (
            <Text style={[styles.fieldStatus, precioValido ? styles.validText : styles.invalidText]}>
              {precioValido ? '✓ Precio válido' : '○ Debe ser mayor a 0'}
            </Text>
          )}


          {/* CATEGORÍA — selector personalizado */}
          <Text style={styles.inputLabel}>Categoría</Text>

          <Pressable
            style={[
              styles.selectorButton,
              mostrarCategorias && styles.selectorButtonActive,
            ]}
            onPress={() => setMostrarCategorias(!mostrarCategorias)}
          >
            <Text style={categoria ? styles.selectorText : styles.selectorPlaceholder}>
              {categoria || 'Selecciona una categoría'}
            </Text>
            <Text style={styles.selectorArrow}>
              {mostrarCategorias ? '▲' : '▼'}
            </Text>
          </Pressable>

          {mostrarCategorias && (
            <View style={styles.dropdownList}>
              {CATEGORIAS.map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.dropdownItem,
                    categoria === cat && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setCategoria(cat);
                    setMostrarCategorias(false);
                    limpiarFeedback();
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      categoria === cat && styles.dropdownItemTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {categoria.length > 0 && (
            <Text style={[styles.fieldStatus, styles.validText]}>
              ✓ Categoría seleccionada
            </Text>
          )}


          {/* STOCK */}
          <AppInput
            label="Stock (unidades)"
            placeholder="Ej: 50"
            value={stock}
            onChangeText={(v) => { setStock(v); limpiarFeedback(); }}
            keyboardType="numeric"
          />
          {stock.length > 0 && (
            <Text style={[styles.fieldStatus, stockValido ? styles.validText : styles.invalidText]}>
              {stockValido ? '✓ Stock válido' : '○ Ingresa un número entero ≥ 0'}
            </Text>
          )}


          {/* ERROR */}
          {error !== '' && (
            <View style={styles.errorBox}>
              <View style={styles.feedbackIcon}>
                <Text style={styles.errorIconText}>!</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.errorTitle}>No se pudo guardar</Text>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>
          )}


          {/* ÉXITO */}
          {registrado && (
            <View style={styles.successBox}>
              <View style={[styles.feedbackIcon, styles.successIconBg]}>
                <Text style={styles.successIconText}>✓</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.successTitle}>¡Producto registrado!</Text>
                <Text style={styles.successMessage}>
                  {nombre} — S/ {precio} — {categoria} — Stock: {stock}
                </Text>
              </View>
            </View>
          )}


          {/* BOTONES */}
          <AppButton title="Guardar producto" onPress={handleGuardar} />

          {registrado && (
            <Pressable style={styles.resetButton} onPress={handleNuevoProducto}>
              <Text style={styles.resetButtonText}>+ Registrar otro producto</Text>
            </Pressable>
          )}

        </View>


        {/* ── PANEL DE VALIDACIONES ── */}
        <View style={styles.validationSection}>

          <View style={styles.validationHeader}>
            <View>
              <Text style={styles.validationTitle}>Validaciones</Text>
              <Text style={styles.validationSubtitle}>Reglas aplicadas al formulario</Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.counterText}>
                {[nombreValido, precioValido, categoriaValida, stockValido].filter(Boolean).length}/4
              </Text>
            </View>
          </View>

          <ValidationRow
            title="Nombre obligatorio"
            description="El campo nombre no puede estar vacío."
            valid={nombreValido}
          />
          <ValidationRow
            title="Precio mayor a 0"
            description="Debe ser un número positivo (ej: 9.99)."
            valid={precioValido}
          />
          <ValidationRow
            title="Categoría seleccionada"
            description="Se debe elegir una categoría de la lista."
            valid={categoriaValida}
          />
          <ValidationRow
            title="Stock válido"
            description="Número entero igual o mayor a 0."
            valid={stockValido}
          />

        </View>


        {/* PIE */}
        <Text style={styles.footer}>
          S10 | AP5 — Formularios y Validaciones
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}


/* ── COMPONENTE AUXILIAR ─────────────────────────────────────────── */

type ValidationRowProps = {
  title: string;
  description: string;
  valid: boolean;
};

function ValidationRow({ title, description, valid }: ValidationRowProps) {
  return (
    <View style={styles.validationRow}>
      <View style={[styles.validationCircle, valid ? styles.circleValid : styles.circlePending]}>
        <Text style={[styles.validationIcon, valid ? styles.iconValid : styles.iconPending]}>
          {valid ? '✓' : '○'}
        </Text>
      </View>

      <View style={styles.validationInfo}>
        <Text style={styles.validationRowTitle}>{title}</Text>
        <Text style={styles.validationRowDescription}>{description}</Text>
      </View>

      <View style={[styles.statusBadge, valid ? styles.badgeValid : styles.badgePending]}>
        <Text style={[styles.statusBadgeText, valid ? styles.badgeTextValid : styles.badgeTextPending]}>
          {valid ? 'OK' : 'Pendiente'}
        </Text>
      </View>
    </View>
  );
}


/* ── ESTILOS ─────────────────────────────────────────────────────── */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  scroll: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },


  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerIconText: {
    fontSize: 26,
  },

  overline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4F46E5',
    letterSpacing: 1.5,
    marginBottom: 2,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#172033',
  },

  description: {
    fontSize: 13,
    color: '#667085',
    marginBottom: 22,
    lineHeight: 20,
  },


  /* FORMULARIO */
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 12,
    color: '#98A2B3',
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },


  /* ESTADO DE CAMPOS */
  fieldStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -10,
    marginBottom: 14,
  },

  validText:   { color: '#16A34A' },
  invalidText: { color: '#D97706' },


  /* SELECTOR DE CATEGORÍA */
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },

  selectorButtonActive: {
    borderColor: '#4F46E5',
  },

  selectorText: {
    fontSize: 15,
    color: '#1F2937',
  },

  selectorPlaceholder: {
    fontSize: 15,
    color: '#9CA3AF',
  },

  selectorArrow: {
    fontSize: 11,
    color: '#667085',
  },

  dropdownList: {
    borderWidth: 1,
    borderColor: '#E8EBF0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  dropdownItemActive: {
    backgroundColor: '#EEF2FF',
  },

  dropdownItemText: {
    fontSize: 14,
    color: '#344054',
  },

  dropdownItemTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },


  /* ERROR */
  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 14,
    padding: 13,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  feedbackIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  errorIconText: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '800',
  },

  messageContainer: { flex: 1 },

  errorTitle: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  errorMessage: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 17,
  },


  /* ÉXITO */
  successBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 13,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  successIconBg: {
    backgroundColor: '#DCFCE7',
  },

  successIconText: {
    color: '#16A34A',
    fontSize: 17,
    fontWeight: '800',
  },

  successTitle: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  successMessage: {
    color: '#15803D',
    fontSize: 12,
    lineHeight: 17,
  },


  /* BOTÓN RESET */
  resetButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },

  resetButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '700',
  },


  /* VALIDACIONES */
  validationSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },

  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  validationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 3,
  },

  validationSubtitle: {
    fontSize: 12,
    color: '#98A2B3',
  },

  counter: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '800',
  },

  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },

  validationCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  circleValid:   { backgroundColor: '#DCFCE7' },
  circlePending: { backgroundColor: '#F3F4F6' },

  validationIcon: { fontSize: 16, fontWeight: '800' },
  iconValid:      { color: '#16A34A' },
  iconPending:    { color: '#98A2B3' },

  validationInfo: { flex: 1 },

  validationRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 2,
  },

  validationRowDescription: {
    fontSize: 11,
    color: '#98A2B3',
    lineHeight: 15,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },

  badgeValid:   { backgroundColor: '#ECFDF3' },
  badgePending: { backgroundColor: '#F2F4F7' },

  statusBadgeText: { fontSize: 9, fontWeight: '800' },
  badgeTextValid:   { color: '#027A48' },
  badgeTextPending: { color: '#667085' },


  /* FOOTER */
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#98A2B3',
    marginTop: 22,
  },
});
