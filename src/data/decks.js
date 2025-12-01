// Concurrency Deck
import TitleSlide from '../slides/TitleSlide';
import ConcurrencyVsParallelism from '../slides/ConcurrencyVsParallelism';
import Goroutines from '../slides/Goroutines';
import Channels from '../slides/Channels';
import BufferedChannels from '../slides/BufferedChannels';
import SelectStatement from '../slides/SelectStatement';
import SyncPackage from '../slides/SyncPackage';
import ContextPackage from '../slides/ContextPackage';
import WorkerPools from '../slides/WorkerPools';
import BestPractices from '../slides/BestPractices';
import Summary from '../slides/Summary';

// Goroutines Deep Dive Deck
import GoroutinesTitle from '../decks/goroutines/GoroutinesTitle';
import GMPModel from '../decks/goroutines/GMPModel';
import StackGrowth from '../decks/goroutines/StackGrowth';
import ContextSwitching from '../decks/goroutines/ContextSwitching';
import RuntimeControl from '../decks/goroutines/RuntimeControl';
import WorkStealing from '../decks/goroutines/WorkStealing';
import Preemption from '../decks/goroutines/Preemption';
import GoroutineStates from '../decks/goroutines/GoroutineStates';

// Interview Prep Deck
import InterviewTitle from '../decks/interview/InterviewTitle';
import Pointers from '../decks/interview/Pointers';
import PointerMechanics from '../decks/interview/PointerMechanics';
import Methods from '../decks/interview/Methods';
import InterfacesIntro from '../decks/interview/InterfacesIntro';
import InterfaceInternals from '../decks/interview/InterfaceInternals';
import EmptyInterface from '../decks/interview/EmptyInterface';
import TypeSafety from '../decks/interview/TypeSafety';
import AdvancedInterfaces from '../decks/interview/AdvancedInterfaces';
import TestingMocking from '../decks/interview/TestingMocking';

// Concurrency Interview Deck
import ConcurrencyTitle from '../decks/concurrency-interview/ConcurrencyTitle';
import GoroutineUnderTheHood from '../decks/concurrency-interview/GoroutineUnderTheHood';
import GoroutinesChannels from '../decks/concurrency-interview/GoroutinesChannels';
import BufferedChannelsQA from '../decks/concurrency-interview/BufferedChannelsQA';
import ChannelInternals from '../decks/concurrency-interview/ChannelInternals';
import ChannelAxioms from '../decks/concurrency-interview/ChannelAxioms';
import SelectSync from '../decks/concurrency-interview/SelectSync';
import MutexTypes from '../decks/concurrency-interview/MutexTypes';
import AtomicOps from '../decks/concurrency-interview/AtomicOps';
import SyncCond from '../decks/concurrency-interview/SyncCond';
import ErrGroup from '../decks/concurrency-interview/ErrGroup';
import ContextPatterns from '../decks/concurrency-interview/ContextPatterns';
import PipelinePatterns from '../decks/concurrency-interview/PipelinePatterns';
import GoroutineLeaks from '../decks/concurrency-interview/GoroutineLeaks';
import DoneChannel from '../decks/concurrency-interview/DoneChannel';
import RaceConditions from '../decks/concurrency-interview/RaceConditions';
import AdvancedRuntime from '../decks/concurrency-interview/AdvancedRuntime';

// Gen-Z Mental Health Deck
import GenZTitle from '../decks/genz-mental-health/GenZTitle';
import BurnoutQuestion from '../decks/genz-mental-health/BurnoutQuestion';
import BoundariesQuestion from '../decks/genz-mental-health/BoundariesQuestion';
import CommunicationQuestion from '../decks/genz-mental-health/CommunicationQuestion';

// Concurrency Masterclass Deck
import GuideTitle from '../decks/concurrency-guide/GuideTitle';
import ConcurrencyIntro from '../decks/concurrency-guide/ConcurrencyIntro';
import GoroutineBasics from '../decks/concurrency-guide/GoroutineBasics';
// GMPModel is already imported from ../decks/goroutines/GMPModel
import ChannelDeepDive from '../decks/concurrency-guide/ChannelDeepDive';
import SelectPatterns from '../decks/concurrency-guide/SelectPatterns';
import SyncPrimitives from '../decks/concurrency-guide/SyncPrimitives';
import ContextMastery from '../decks/concurrency-guide/ContextMastery';
import AdvancedPatterns from '../decks/concurrency-guide/AdvancedPatterns';
import CommonPitfalls from '../decks/concurrency-guide/CommonPitfalls';
import DebuggingTools from '../decks/concurrency-guide/DebuggingTools';
import RealWorldExamples from '../decks/concurrency-guide/RealWorldExamples';
import GuideBestPractices from '../decks/concurrency-guide/GuideBestPractices';

// Hindi Concurrency Deck
import HindiTitle from '../decks/hindi-concurrency/HindiTitle';
import HindiIntro from '../decks/hindi-concurrency/HindiIntro';
import HindiGoroutines from '../decks/hindi-concurrency/HindiGoroutines';
import HindiGMP from '../decks/hindi-concurrency/HindiGMP';
import HindiChannels from '../decks/hindi-concurrency/HindiChannels';
import HindiSelect from '../decks/hindi-concurrency/HindiSelect';
import HindiSync from '../decks/hindi-concurrency/HindiSync';
import HindiContext from '../decks/hindi-concurrency/HindiContext';
import HindiPatterns from '../decks/hindi-concurrency/HindiPatterns';
import HindiIssues from '../decks/hindi-concurrency/HindiIssues';
import HindiTools from '../decks/hindi-concurrency/HindiTools';
import HindiRealWorld from '../decks/hindi-concurrency/HindiRealWorld';
import HindiBestPractices from '../decks/hindi-concurrency/HindiBestPractices';
import HindiSummary from '../decks/hindi-concurrency/HindiSummary';

export const DECKS = {
    concurrency: [
        TitleSlide,
        ConcurrencyVsParallelism,
        Goroutines,
        Channels,
        BufferedChannels,
        SelectStatement,
        SyncPackage,
        ContextPackage,
        WorkerPools,
        BestPractices,
        Summary
    ],
    goroutines: [
        GoroutinesTitle,
        GMPModel,
        StackGrowth,
        ContextSwitching,
        RuntimeControl,
        WorkStealing,
        Preemption,
        GoroutineStates,
        Summary // Reusing summary for now
    ],
    interview: [
        InterviewTitle,
        Pointers,
        PointerMechanics,
        Methods,
        InterfacesIntro,
        InterfaceInternals,
        EmptyInterface,
        TypeSafety,
        AdvancedInterfaces,
        TestingMocking,
        Summary // Reusing summary for now
    ],
    'concurrency-interview': [
        ConcurrencyTitle,
        GoroutineUnderTheHood,
        GoroutinesChannels,
        BufferedChannelsQA,
        ChannelInternals,
        ChannelAxioms,
        SelectSync,
        MutexTypes,
        AtomicOps,
        SyncCond,
        ErrGroup,
        ContextPatterns,
        PipelinePatterns,
        GoroutineLeaks,
        DoneChannel,
        RaceConditions,
        AdvancedRuntime,
        Summary // Reusing summary for now
    ],
    'genz-mental-health': [
        GenZTitle,
        BurnoutQuestion,
        BoundariesQuestion,
        CommunicationQuestion,
        Summary
    ],
    'concurrency-guide': [
        GuideTitle,
        ConcurrencyIntro,
        GoroutineBasics,
        GMPModel, // Reusing from goroutines deck
        ChannelDeepDive,
        SelectPatterns,
        SyncPrimitives,
        ContextMastery,
        AdvancedPatterns,
        CommonPitfalls,
        DebuggingTools,
        RealWorldExamples,
        GuideBestPractices,
        Summary
    ],
    'hindi-concurrency': [
        HindiTitle,
        HindiIntro,
        HindiGoroutines,
        HindiGMP,
        HindiChannels,
        HindiSelect,
        HindiSync,
        HindiContext,
        HindiPatterns,
        HindiIssues,
        HindiTools,
        HindiRealWorld,
        HindiBestPractices,
        HindiSummary
    ]
};
