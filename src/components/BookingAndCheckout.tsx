import React, { useState } from 'react';
import { SprintPackage, InstructorSlot, BookedAppointment, StudentProfile } from '../types';
import { Calendar, Clock, CreditCard, CheckCircle2, Download, ShieldCheck, ArrowRight, X, User, Sparkles, AlertCircle } from 'lucide-react';

interface BookingAndCheckoutProps {
  packages: SprintPackage[];
  profile: StudentProfile;
  bookedAppointments: BookedAppointment[];
  onCompleteBooking: (appointment: BookedAppointment) => void;
  onCancelAppointment: (bookingId: string) => void;
}

export const BookingAndCheckout: React.FC<BookingAndCheckoutProps> = ({
  packages,
  profile,
  bookedAppointments,
  onCompleteBooking,
  onCancelAppointment,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<SprintPackage>(packages[0]);
  const [selectedSlot, setSelectedSlot] = useState<InstructorSlot | null>(packages[0].slots[0] || null);
  
  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [studentName, setStudentName] = useState(profile.name);
  const [studentEmail, setStudentEmail] = useState(profile.email);
  const [studentUniversity, setStudentUniversity] = useState(profile.university);
  const [weakTopicsNotes, setWeakTopicsNotes] = useState('');
  
  // Payment fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookedAppointment | null>(null);

  // Filter package change
  const handleSelectPackage = (pkg: SprintPackage) => {
    setSelectedPackage(pkg);
    const availableSlot = pkg.slots.find((s) => !s.isBooked) || pkg.slots[0];
    setSelectedSlot(availableSlot || null);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'VENTUREQUEST' || promoCode.trim().toUpperCase() === 'PREMED15') {
      setDiscountPercent(15);
      setPromoMessage('15% Venture Quest early-adopter grant applied!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid promo code. Try "VENTUREQUEST"');
    }
  };

  const finalPrice = Math.round(selectedPackage.priceUsd * (1 - discountPercent / 100));

  const handleFormatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleFormatExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newBooking: BookedAppointment = {
        bookingId: `SS-${Math.floor(100000 + Math.random() * 900000)}`,
        packageId: selectedPackage.id,
        packageTitle: selectedPackage.title,
        instructorName: selectedPackage.instructorName,
        instructorSchool: selectedPackage.instructorSchool,
        dateTimeString: `${selectedSlot.dayLabel} at ${selectedSlot.time}`,
        studentName: studentName || profile.name,
        studentEmail: studentEmail || profile.email,
        studentUniversity: studentUniversity || profile.university,
        courseFocus: selectedPackage.subject === 'organic-chemistry' ? 'Organic Chemistry II' : 'Human Anatomy',
        weakTopicsNotes: weakTopicsNotes || 'High-Yield Exam Preparation',
        pricePaid: finalPrice,
        paymentMethod: cardNumber ? `Card ending in ${cardNumber.slice(-4) || '4242'}` : 'Direct University Student Pay',
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      onCompleteBooking(newBooking);
      setConfirmedBooking(newBooking);
      setIsProcessing(false);
    }, 800);
  };

  // Download .ICS calendar invite file
  const handleDownloadIcs = (booking: BookedAppointment) => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//StudySync AI//Pre-Med Exam Sprint//EN',
      'BEGIN:VEVENT',
      `UID:${booking.bookingId}@studysync.ai`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:StudySync AI Sprint: ${booking.packageTitle}`,
      `DESCRIPTION:Instructor: ${booking.instructorName} (${booking.instructorSchool})\\nCourse Focus: ${booking.courseFocus}\\nNotes: ${booking.weakTopicsNotes}\\nBooking Reference: ${booking.bookingId}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `StudySync_${booking.bookingId}_Appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Printable Invoice / Receipt
  const handleDownloadReceipt = (booking: BookedAppointment) => {
    const text = [
      '=============================================================',
      '                  STUDYSYNC AI - BOOKING RECEIPT             ',
      '     Pre-Med Active Learning & High-Yield Sprint Platform     ',
      '=============================================================',
      '',
      `Booking Reference: ${booking.bookingId}`,
      `Date Issued:       ${new Date(booking.createdAt).toLocaleString()}`,
      `Payment Status:    CONFIRMED & LOCKED IN`,
      '',
      '------------------ STUDENT INFORMATION ----------------------',
      `Student Name:      ${booking.studentName}`,
      `Student Email:     ${booking.studentEmail}`,
      `University:        ${booking.studentUniversity}`,
      `Course Focus:      ${booking.courseFocus}`,
      '',
      '------------------ SESSION DETAILS --------------------------',
      `Session Package:   ${booking.packageTitle}`,
      `Instructor:        ${booking.instructorName}`,
      `Affiliation:       ${booking.instructorSchool}`,
      `Date & Time:       ${booking.dateTimeString}`,
      `Preparation Notes: ${booking.weakTopicsNotes}`,
      '',
      '------------------ PAYMENT TRANSACTION ----------------------',
      `Payment Method:    ${booking.paymentMethod}`,
      `Amount Paid:       $${booking.pricePaid}.00 USD`,
      'Tax & Fees:        $0.00 (University Academic Waiver)',
      `Total Charged:     $${booking.pricePaid}.00 USD`,
      '',
      '=============================================================',
      'Validation Notice: Generated for DGU Venture Quest Assignment 2',
      'Empirical Validation: Customer self-service direct checkout.',
      '=============================================================',
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `StudySync_Receipt_${booking.bookingId}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Title & Core Assumption Framing */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Self-Service Exam Sprint Booking</h1>
        <p className="text-xs text-slate-500 mt-1">
          Lock in a 1-on-1 diagnostic review session with top-percentile medical student teaching fellows. Instant scheduling without sales calls.
        </p>
      </div>

      {/* Package Selector Cards (3 choices) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {packages.map((pkg) => {
          const isSelected = selectedPackage.id === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => handleSelectPackage(pkg)}
              className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-sky-600 bg-white ring-2 ring-sky-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">
                    {pkg.subject === 'organic-chemistry' ? 'Organic Chemistry' : 'Human Anatomy'}
                  </span>
                  <span className="font-mono tabular-nums text-slate-900 font-bold">${pkg.priceUsd}</span>
                </div>

                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {pkg.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div>
                    Instructor: <strong className="text-slate-800">{pkg.instructorName}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {pkg.instructorTitle}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">{pkg.durationMinutes} min session</span>
                <span className={`font-semibold ${isSelected ? 'text-sky-700' : 'text-slate-500'}`}>
                  {isSelected ? 'Selected Package' : 'Click to Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-Time Availability & Slot Selection Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Real-Time Available Slots · {selectedPackage.title}
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">
              Select an open sprint slot to proceed directly to instant automated checkout.
            </div>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Instructor: {selectedPackage.instructorName}
          </div>
        </div>

        {/* Slot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {selectedPackage.slots.map((slot) => {
            const isBooked = slot.isBooked || bookedAppointments.some((b) => b.packageId === selectedPackage.id && b.dateTimeString.includes(slot.time));
            const isSelected = selectedSlot?.id === slot.id && !isBooked;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={isBooked}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isBooked
                    ? 'border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed'
                    : isSelected
                    ? 'border-sky-600 bg-sky-50/50 ring-1 ring-sky-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="text-[11px] text-slate-500 block">{slot.dayLabel}</span>
                <span className="text-xs font-semibold text-slate-900 block mt-0.5">{slot.time}</span>
                <span className="text-[10px] mt-1.5 block font-medium">
                  {isBooked ? (
                    <span className="text-slate-400">Booked</span>
                  ) : isSelected ? (
                    <span className="text-sky-700 font-bold">Selected</span>
                  ) : (
                    <span className="text-emerald-700">Available</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Slot Summary & Direct Checkout Trigger */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            {selectedSlot ? (
              <span>
                Selected Slot: <strong className="text-slate-900">{selectedSlot.dayLabel} at {selectedSlot.time}</strong> (${selectedPackage.priceUsd})
              </span>
            ) : (
              <span>Please choose an open time slot above</span>
            )}
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={!selectedSlot}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Proceed to Direct Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Booked Sessions List (Persistence Display) */}
      {bookedAppointments.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Scheduled Sprint Sessions</h2>
              <div className="text-xs text-slate-500">Live booking confirmations stored for your student profile</div>
            </div>
            <span className="text-xs font-semibold text-slate-700 font-mono">
              {bookedAppointments.length} Active {bookedAppointments.length === 1 ? 'Booking' : 'Bookings'}
            </span>
          </div>

          <div className="space-y-3">
            {bookedAppointments.map((app) => (
              <div
                key={app.bookingId}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-slate-500 font-semibold">{app.bookingId}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">Confirmed & Paid</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{app.dateTimeString}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900">
                    {app.packageTitle}
                  </h3>

                  <div className="text-xs text-slate-500">
                    Instructor: {app.instructorName} ({app.instructorSchool}) · Amount: ${app.pricePaid} USD
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDownloadIcs(app)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>iCal (.ics)</span>
                  </button>

                  <button
                    onClick={() => handleDownloadReceipt(app)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </button>

                  <button
                    onClick={() => onCancelAppointment(app.bookingId)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Cancel booking"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && selectedSlot && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Direct Payment & Instant Booking</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Automated Self-Service Checkout · No human sales rep required
                </div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Order Summary box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between font-medium text-slate-800">
                  <span>{selectedPackage.title}</span>
                  <span className="font-mono tabular-nums">${selectedPackage.priceUsd}.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Slot Time</span>
                  <span>{selectedSlot.dayLabel} at {selectedSlot.time}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Instructor</span>
                  <span>{selectedPackage.instructorName}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Venture Quest Grant (-{discountPercent}%)</span>
                    <span className="font-mono tabular-nums">-${Math.round(selectedPackage.priceUsd * 0.15)}.00</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Amount Due</span>
                  <span className="font-mono tabular-nums">${finalPrice}.00 USD</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleExecutePayment} className="space-y-4">
                
                {/* Student Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">University / DGU Email</label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-700 font-semibold mb-1">Specific Weak Topics / Chapters to Focus</label>
                  <input
                    type="text"
                    value={weakTopicsNotes}
                    onChange={(e) => setWeakTopicsNotes(e.target.value)}
                    placeholder="e.g. SN1 vs E1 carbocation rearrangements, or Cranial Nerve foramina"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                {/* Promo Code Input */}
                <div className="text-xs">
                  <label className="block text-slate-700 font-semibold mb-1">Discount Grant / Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Try code: VENTUREQUEST"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-hidden focus:border-sky-500 uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <span className={`text-[11px] block mt-1 ${discountPercent > 0 ? 'text-emerald-700 font-medium' : 'text-slate-500'}`}>
                      {promoMessage}
                    </span>
                  )}
                </div>

                {/* Simulated Payment Card Fields */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Payment Card</span>
                    </span>
                    <span className="text-[11px] font-normal text-slate-400">Sandbox Test Mode</span>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={handleFormatCardNumber}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono focus:bg-white focus:outline-hidden focus:border-sky-500"
                  />

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleFormatExpiry}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono focus:bg-white focus:outline-hidden focus:border-sky-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVC (e.g. 123)"
                      value={cardCvc}
                      maxLength={4}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono focus:bg-white focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    {isProcessing ? (
                      <span>Validating Payment & Booking Slot...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Pay ${finalPrice}.00 USD & Lock In Appointment</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Tests venture assumption: 100% self-sufficient customer checkout without manual human friction.
                  </p>
                </div>

              </form>

            </div>

          </div>
        </div>
      )}

      {/* CONFIRMED BOOKING MODAL */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 text-center">
            
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400">REFERENCE: {confirmedBooking.bookingId}</span>
              <h3 className="text-xl font-bold text-slate-900">Appointment Locked In!</h3>
              <p className="text-xs text-slate-500">
                Payment verified. The teaching fellow has received your exam prep notes and calendar hold.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Session:</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.packageTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time:</span>
                <span className="font-medium text-slate-900">{confirmedBooking.dateTimeString}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Instructor:</span>
                <span className="font-medium text-slate-900">{confirmedBooking.instructorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-medium text-slate-900">{confirmedBooking.studentName} ({confirmedBooking.studentUniversity})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-emerald-700 font-mono">${confirmedBooking.pricePaid}.00 USD</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleDownloadIcs(confirmedBooking)}
                className="py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Download .ICS</span>
              </button>

              <button
                onClick={() => handleDownloadReceipt(confirmedBooking)}
                className="py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                setIsCheckoutOpen(false);
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Done & Return to Dashboard
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
