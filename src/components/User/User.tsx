import { useState } from 'react';
import firebase, { db } from '../../Firebase';
import Styles from './css/User.module.css';
import { useForm } from 'react-hook-form';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { UserTypes } from '../../types/types';

export const User = () => {
    const [name, setName] = useState('');
    const [pending, setPending] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();

    // Firebaseでログインしたユーザーのuidを取得
    const user = firebase.auth().currentUser;
    let authId: string | undefined;
    if (user != null) {
        user.providerData.forEach(() => {
            authId = user.uid;
        });
    }

    // 新規ユーザー登録フォーム
    const OnSubmit = async () => {
        setPending(true);
        try {
            await firebase.firestore().collection('users').add({
                authId,
                name,
            });
            setSubmitted(true);
            window.location.reload();
        } finally {
            setPending(false);
        }
    };

    // 新規ユーザー登録処理後
    const [list, loading, error] = useCollectionData<UserTypes>(db.collection('users'), { idField: 'docId' });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    // ログイン認証IDと新規登録でアップしたIDが一致する情報を取得
    const createUser = list?.find((user) => user.authId === authId);

    // 編集フォームの初期値はDBのデータで保存
    const initialName = createUser?.name || '';

    // 新規登録後の編集フォーム
    const handleEditFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPending(true);
        try {
            if (createUser) {
                await firebase.firestore().collection('users').doc(createUser.docId).update({
                    name: name !== '' ? name : initialName,
                });
                setSubmitted(true);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setPending(false);
        }
    };

    return (
        <section className={Styles.user}>
            {!createUser ? (
                <div className={Styles.form}>
                    <h2>プロフィール登録</h2>
                    <form onSubmit={handleSubmit(OnSubmit)}>
                        <label>ユーザー名</label>
                        <input
                            {...register('name', { required: true })}
                            className={Styles.input}
                            type="text"
                            name="name"
                            value={name}
                            placeholder="ユーザー名"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className={Styles.error}>{errors.name?.type === 'required' && 'お名前が入力されていません'}</p>
                        
                        <button className={Styles.submitBtn} type="submit">登録</button>
                        {pending && 'Pending...'}
                    </form>
                </div>
            ) : (
                <div className={Styles.form}>
                    <h2>プロフィール更新</h2>
                    <form onSubmit={handleEditFormSubmit}>
                        <label>ユーザー名</label>
                        <input
                            className={Styles.input}
                            type="text"
                            name="name"
                            value={name !== '' ? name : initialName}
                            placeholder="ユーザー名"
                            onChange={(e) => setName(e.target.value)}
                        />

                        {submitted && <p className={Styles.update}>更新しました</p>}
                        <button className={Styles.submitBtn} type="submit">更新</button>
                    </form>
                </div>
            )}
        </section>
    );
}
