'use client';
import './style.scss';
import { FormEvent, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Box, TextField, Typography, Button, Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Person } from '@classes/person/Person';
import { SendFormToN8n } from '@/app/api/sendForm/N8NConection';
import { Errors } from '@utils/IError';
import { sanitize, validateForm } from '@utils/validate';

export default function TalkToUs() {

    const [form, setForm] = useState<Person>(new Person);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null)
    const [errors, setErrors] = useState<Errors>({});

    function handleChange(field: keyof Person, value: string | Date | null) {
        setForm(prev => {
            const data = { ...prev, [field]: value };
            return Person.fromJson(data);
        });
    };

    function formatForm(form: Person): Person {
        return Person.fromJson({
            ...form,
            firstname: sanitize(String(form.firstname ?? '')),
            lastname: sanitize(String(form.lastname ?? '')),
            phone: String(form.phone ?? '').replace(/\D/g, ''),
            date: form.date ? dayjs(form.date).toISOString() : null,
        });
    }

    function validateFormData(form: Person): Errors {
        const error = validateForm(form);
        return error;
    }
    async function sendForm(
        form: Person,
        setForm: (form: Person) => void,
        setErrors: (errors: Errors) => void,
        setSuccessMsg: (msg: string | null) => void
    ) {
        try {
            await SendFormToN8n(form);
            setForm(new Person());
            setErrors({});
            setSuccessMsg('Formulário enviado com sucesso, em breve entraremos em contato!');
            setTimeout(() => setSuccessMsg(null), 5000);
        } catch (err) {
            console.error(err);
            setSuccessMsg('Desculpa, infelizmente ocorreu um erro. Tente novamente.');
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setSuccessMsg(null);

        const formattedForm = formatForm(form);
        const errors = validateFormData(formattedForm);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        }

        await sendForm(formattedForm, setForm, setErrors, setSuccessMsg);
        setLoading(false);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br" >
            <Box component="section" className="talkToUs" id="talkToUs">
                <Typography variant="h6" className="title" data-aos="fade-up">
                    <span className="bold">Fale</span> conosco<span className="bold">!</span>
                </Typography>

                {successMsg && (
                    <Alert severity={successMsg.startsWith("F") ? "success" : "error"}>
                        {successMsg}
                    </Alert>
                )}

                <form className='form' onSubmit={handleSubmit}>
                    <Box marginBottom="1rem" component="div" data-aos="fade-up" data-aos-duration="1000">
                        <TextField
                            label="Nome"
                            value={form?.firstname}
                            onChange={(it) => handleChange('firstname', it.target.value)}
                            fullWidth
                            required
                            error={!!errors.firstname}
                            helperText={errors.firstname}
                        />
                    </Box>
                    <Box marginBottom="1rem" component="div" data-aos="fade-up" data-aos-duration="1000">
                        <TextField
                            label="Sobrenome"
                            value={form?.lastname}
                            onChange={(it) => handleChange('lastname', it.target.value)}
                            fullWidth
                            required
                            error={!!errors.lastname}
                            helperText={errors.lastname}
                        />
                    </Box>
                    <Box marginBottom="1rem" component="div" className='phoneNdate' data-aos="fade-up" data-aos-duration="1000">
                        <TextField
                            label="Telefone"
                            value={form?.phone}
                            onChange={(it) => handleChange('phone', it.target.value)}
                            fullWidth
                            placeholder='3290001111'
                            required
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />

                        <DatePicker
                            className='date'
                            label="Agendamento"
                            value={form.date ? dayjs(form.date) : null}
                            onChange={(it) => {
                                handleChange("date", it?.toDate() ?? null);
                            }}
                            format="DD/MM/YYYY"
                            slotProps={{
                                textField: {
                                    required: true,
                                    error: !!errors.date,
                                    helperText: errors.date,
                                },
                            }}
                        />
                    </Box>
                    <Box marginBottom="1rem" component="div" data-aos="fade-up" data-aos-duration="1000">
                        <TextField
                            label="email"
                            value={form?.email}
                            onChange={(it) => handleChange('email', it.target.value)}
                            fullWidth
                        />
                    </Box>

                    <Button type="submit" variant="contained" fullWidth data-aos="fade-up" data-aos-duration="1000" sx={{backgroundColor: 'var(--primary-btn)'}}>
                        {loading ? "Enviando..." : "Agendar"}
                    </Button>
                </form>

            </Box>
        </LocalizationProvider>
    )
}