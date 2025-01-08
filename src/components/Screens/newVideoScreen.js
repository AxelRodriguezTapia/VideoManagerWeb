import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, updateDoc, arrayUnion, collection, getDocs } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore'; // Para usar timestamps del servidor
import styled from 'styled-components';

// Estilos para los componentes
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const FormField = styled.div`
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:disabled {
    background-color: #95a5a6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

const Option = styled.option``;

const AlertText = styled.p`
  color: red;
  font-size: 14px;
`;

export default function NewVideoScreen({ navigation }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [newListName, setNewListName] = useState('');
  const [userSaves, setUserSaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;

  // Obtener las listas del usuario
  useEffect(() => {
    const fetchUserSaves = async () => {
      try {
        if (currentUser) {
          const listsCollectionRef = collection(db, 'userSaves', currentUser.uid, 'lists');
          const listsSnapshot = await getDocs(listsCollectionRef);
          
          if (!listsSnapshot.empty) {
            const lists = listsSnapshot.docs.map(doc => doc.id);
            setUserSaves(lists);
          } else {
            setUserSaves([]);
          }
        }
      } catch (error) {
        console.error('Error al obtener las listas: ', error);
      }
    };

    fetchUserSaves();
  }, [currentUser]);

  // Crear una nueva lista
  const handleCreateList = async () => {
    if (!newListName) {
      alert('Por favor ingresa un nombre para la lista.');
      return;
    }

    try {
      const listRef = doc(db, 'userSaves', currentUser.uid, 'lists', newListName);
      await setDoc(listRef, { videos: [] });

      setUserSaves(prevLists => [...prevLists, newListName]);
      setSelectedList(newListName);
      setNewListName('');
      alert('¡Lista creada correctamente!');
    } catch (error) {
      console.error('Error al crear la lista: ', error);
      alert('Hubo un error al crear la lista.');
    }
  };

  // Guardar el video en la lista seleccionada
  const handleSave = async () => {
    if (!url || !title || !description || !selectedList) {
      alert('Por favor complete todos los campos y seleccione una lista.');
      return;
    }

    setLoading(true);

    try {
      const video = { 
        url, 
        title, 
        description, 
        createdAt: new Date().toISOString(), // Timestamp local
      };

      const listDocRef = doc(db, 'userSaves', currentUser.uid, 'lists', selectedList);
      await updateDoc(listDocRef, {
        videos: arrayUnion(video),
      });

      alert('¡Video guardado correctamente!');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el video: ', error);
      alert('Hubo un error al guardar el video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Guardar un Nuevo Video</Title>

      {/* Campos del formulario */}
      <FormField>
        <label>URL del video</label>
        <Input 
          type="text"
          placeholder="URL del video"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </FormField>

      <FormField>
        <label>Título del video</label>
        <Input 
          type="text"
          placeholder="Título del video"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </FormField>

      <FormField>
        <label>Descripción del video</label>
        <Input 
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </FormField>

      {/* Selector de lista */}
      <FormField>
        <label>Selecciona una lista</label>
        {userSaves.length > 0 ? (
          <Select value={selectedList} onChange={e => setSelectedList(e.target.value)}>
            <Option value="">Seleccionar lista...</Option>
            {userSaves.map((list, index) => (
              <Option key={index} value={list}>{list}</Option>
            ))}
          </Select>
        ) : (
          <AlertText>No tienes listas creadas.</AlertText>
        )}
      </FormField>

      {/* Opción para crear una nueva lista */}
      <FormField>
        <label>O crea una nueva lista</label>
        <Input
          type="text"
          placeholder="Nombre de la nueva lista"
          value={newListName}
          onChange={e => setNewListName(e.target.value)}
        />
        <Button onClick={handleCreateList}>Crear nueva lista</Button>
      </FormField>

      {/* Botón para guardar el video */}
      <Button onClick={handleSave} disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar Video'}
      </Button>
    </Container>
  );
}
